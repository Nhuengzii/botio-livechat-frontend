<template>
  <div class="flex-[2] shrink-1 bg-while">
    <div class="flex flex-col w-full h-full ">
      <div class="flex mx-3">
        <Vue3TabsChrome :ref="setTabRef" :tabs="tabs" v-model="tabKey" :on-close="handleClose" :class="{'w-[85%]' : tabs.length > 0, 'w-[100%]' : tabs.length == 0}" />
        <template v-if="tabs.length > 0">
          <button @click="clearTab" class="bg-[#D9D9D9] w-[15%] flex flex-row justify-center items-center">
            <h1>ปิดแท็บทั้งหมด</h1>
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl" color="red" />
          </button>
        </template>

      </div>

      <!-- header chats-->
      <header class="bg-[#EEEEEE] flex-[2] mx-3 ">
        <div class="flex items-center py-5 justify-start">

          <!-- show name conversation-->
          <div class="mx-3 object-cover h-12 w-12 rounded-full">
            <img :src="currentChat?.conversation.participants[0].profilePic.src" class="rounded-full" />
          </div>

          <!-- show picture conversation -->
          <div class="px-4">
            <p class="">{{ currentChat?.conversation.participants[0].username ?? 'ไม่มีชื่อ' }}</p>
          </div>

          <div class="justify-self-end">
            <font-awesome-icon :icon="['fas', 'circle-info']" size="xl" />
          </div>


        </div>
      </header>


      <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mx-3" id="containMessage"
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
});

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
</style>

