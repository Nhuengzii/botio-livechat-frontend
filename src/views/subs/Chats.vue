<template>
  <div class="flex-[2]  bg-while min-w-48">
    <div class="flex flex-col w-full h-full">
      <div class="flex mx-3">
        <Vue3TabsChrome :ref="setTabRef" :tabs="tabs" v-model="tabKey" :on-close="handleClose" class="bg-[#EAEAEA]"
          :class="{ 'w-[calc(100%-176px)]': tabs.length > 0, 'w-[100%]': tabs.length == 0 }" />
        <template v-if="tabs.length > 0">
          <button @click="clearTab" class="bg-gray-50 hover:bg-gray-200 w-44 flex flex-row justify-center items-center">
            <h1 class="pr-2 font-semibold">ปิดแท็บทั้งหมด</h1>
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl" color="red" />
          </button>
        </template>

      </div>

      <!-- header chats-->
      <header class="bg-[#EEEEEE] flex-[1] mx-3 ">
        <div class="flex items-center py-5 justify-start">
          <!-- show name conversation-->
          <div class="mx-6 object-cover h-12 w-12 rounded-full">
            <img :src="currentChat?.conversation.participants[0].profilePic.src" class="rounded-full" />
            <template v-if="currentChat?.conversation.participants[0].username">
              <div class="absolute top-8 left-8 bg-white rounded-full flex w-[26px] h-[26px] items-center justify-center">
                <font-awesome-icon v-if="currentChat.conversation.platform === 'facebook'" :icon="['fab', 'facebook']"
                  style="color: #2F58CD;" size="xl" />
                <font-awesome-icon v-if="currentChat.conversation.platform === 'instagram'" :icon="['fab', 'instagram']"
                  style="color: #DF2E38;" size="xl" />
                <font-awesome-icon v-if="currentChat.conversation.platform === 'line'" :icon="['fab', 'line']"
                  style="color: #38E54D;" size="lg" />
              </div>
            </template>
          </div>

          <!-- show picture conversation -->
          <div class="flex-1">
            <div class="px-4 flex items-center justify-center">
              <template v-if="currentChat?.conversation.participants[0].username">
                <p class="font-medium">{{ currentChat?.conversation.participants[0].username }}</p>
                <div class="flex ml-auto items-center">

                  <!-- click to search conversation  --> 
                  <button @click="console.log('click to search')">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="xl" class="mr-4" />
                  </button>
                   <font-awesome-icon :icon="['fas', 'circle-info']" size="xl" class="ml-5 " style="color: #000000;"/>
                  <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="ml-5 " size="xl"/>
 
                </div>
              </template>
            </div>
          </div>

        </div>
      </header>


      <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mb-4  mx-3" id="containMessage"
        ref="conversationRef">
        <div class="grid grid-cols-12 gap-y-0.5">
          
          <template v-for="(message, index, timestamp) in currentChat?.messages" key="message.messageID">
            <template v-if="isNewDay(index)">

              <div class="col-start-5 col-end-8 py-8">
                <div class="flex flex-row justify-center">{{ getFormattedDate(message.timestamp) }}</div>
              </div>
            </template>
            <!-- Render the message content from user -->
            <template v-if="message.source.userType === 'user'">



              <div class="col-start-1 col-end-8 pl-3 round-lg max-w-full"
                :class="{ 'pt-4': shouldShowProfilePicture(index), 'py-1': !shouldShowProfilePicture(index) }">
                <MessageBlock :message="message" :conversation="currentChat!.conversation"
                  :is-show-profile="shouldShowProfilePicture(index)" />
              </div>
            </template>

            <!-- Render the message content from admin -->
            <template v-else>
              <div class="col-start-6 col-end-13 pr-3 rounded-lg"
                :class="{ 'pt-4': shouldShowProfilePicture(index), 'py-1': !shouldShowProfilePicture(index) }">
                <MessageBlock :message="message" :conversation="currentChat!.conversation"
                  :is-show-profile="shouldShowProfilePicture(index)" />
              </div>
            </template>

          </template>
        </div>
      </main>

      <template v-if="currentChat?.conversation.participants[0].username">
        <MessageSender />
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from "@/stores/livechat";
import type { Conversation } from "@/types/conversation";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref, type Ref, onBeforeMount, nextTick, defineComponent, reactive, watch, } from "vue";
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
import MessageBlock from "@/components/MessageBlock.vue";
import MessageSender from "@/components/MessageSender.vue";
import { useRoute } from 'vue-router';
const route = useRoute()
const livechatStore = useLivechatStore()
const { openChatEventBus, botioLivechat, currentChat, } = storeToRefs(livechatStore)
const isLoading = ref(false)
const conversationRef = ref<HTMLElement | null>(null);


// tabs-chrome
import Vue3TabsChrome, { type Tab } from 'vue3-tabs-chrome'
import '@/assets/vue3-tabs-chrome.css'
import { onBeforeRouteUpdate } from "vue-router";
defineComponent({
  components: {
    Vue3TabsChrome
  }
})
const tabRef: Ref = ref()
const tabKey = ref(null as null | string)
const tabs: Array<Tab> = reactive<Array<Tab>>([
])
const setTabRef = (el: HTMLElement) => {
  tabRef.value = el
}
function clearTab() {
  currentChat.value = null
  // remove all tabs
  try {
    tabs.splice(0, tabs.length)
    tabKey.value = null
  } catch (e) {
    alert(`clear tab error ${e}`)
  }
}
const handleAdd = (conversation: Conversation) => {
  const key = `${conversation.platform}-${conversation.conversationID}`;
  for (const tab of tabs) {
    if (tab.key === key) {
      tabKey.value = key
      return;
    }
  }
  if (tabRef.value === null) {
    console.log('undefined tabRef')
    return;
  }
  tabRef.value.addTab({
    label: conversation.participants[0].username,
    key: key,
    favico: conversation.participants[0].profilePic.src,
  })
  tabKey.value = key
}

const handleClose = (tab: Tab, key: string, index: number) => {
  livechatStore.closeChat(key)
}

watch(tabKey, (newTab, oldTab) => {
  if (tabs.length === 0) {
    livechatStore.currentChat = null;
    return;
  }
  if (newTab === null) {
    return;
  }
  const [platform, conversationID] = newTab.split("-");
  livechatStore.markAsReadEventBus.emit(conversationID);
  livechatStore.openChat(platform, conversationID);
})


function openChat(conversation: Conversation) {
  isLoading.value = true
  handleAdd(conversation)
  livechatStore.fetchMessages(conversation.platform, conversation).then(() => {
    console.log("fetch message success")
  })
}
openChatEventBus.value.on(openChat)

onBeforeRouteUpdate((to, from, next) => {
  console.log("before route update")
  next()
})

const isNewDay = (index: number): boolean => {
  if (index === 0) {
    return true;
  }

  const previousMessage = currentChat.value?.messages[index - 1];
  const currentMessage = currentChat.value?.messages[index];

  if (!previousMessage || !currentMessage) {
    return true;
  }

  const thailandOffset = 7; // Thailand timezone offset in hours

  const previousDate = new Date(previousMessage.timestamp);
  previousDate.setHours(previousDate.getHours() + thailandOffset);
  const previousFormattedDate = previousDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const currentDate = new Date(currentMessage.timestamp);
  currentDate.setHours(currentDate.getHours() + thailandOffset);
  const currentFormattedDate = currentDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return previousFormattedDate !== currentFormattedDate;
};

const shouldShowProfilePicture = (index: number): boolean => {
  if (index === 0) return true;

  const previousMessage = currentChat.value?.messages[index - 1];
  const currentMessage = currentChat.value?.messages[index];

  if (!previousMessage || !currentMessage) return true; // Add null check

  const previousTime = new Date(previousMessage.timestamp).getTime();
  const currentTime = new Date(currentMessage.timestamp).getTime();

  const timeDiff = currentTime - previousTime;
  const minuteInMs = 60 * 1000;

  return (
    (previousMessage.source.userType !== 'user' && currentMessage.source.userType === 'user') || // Different user
    timeDiff > minuteInMs // Time interval greater than 1 minute
  );
};

const getFormattedDate = (timestamp: number): string => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);

  if (
    currentDate.getDate() === messageDate.getDate() &&
    currentDate.getMonth() === messageDate.getMonth() &&
    currentDate.getFullYear() === messageDate.getFullYear()
  ) {
    return 'วันนี้';
  } else {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Bangkok',
    };
    return messageDate.toLocaleDateString('th-TH', options);
  }
};




const scrollToLastMessage = () => {
  nextTick(() => {
    nextTick(() => {
      const conversationContainer = conversationRef.value;
      if (conversationContainer) {
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
      }
    });
  });
};



onMounted(() => {
  scrollToLastMessage();
})


onUpdated(() => {
  scrollToLastMessage();
})


</script>

<style scoped>
.background-d9 {
  background-color: rgba(217, 217, 217, 0.3);

}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
button {
    color: #B2B2B2;
}
.button:hover {
      color:#000000;
      transition: 0.5s;
  }
</style>

