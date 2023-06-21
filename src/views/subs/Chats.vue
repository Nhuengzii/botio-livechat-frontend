<template>
  <div class="flex-[2] shrink-1 background-d9">
    <div class="flex flex-col w-full h-full ">
      <Vue3TabsChrome :ref="setTabRef" :tabs="tabs" v-model="tabKey" :on-close="handleClose" />
      <!-- header chats-->
      <header class="bg-white flex-[2] mx-3 mb-4">
        <div class="flex items-center py-5">

          <!-- show name conversation-->
          <div class="mx-3 object-cover h-12 w-12 rounded-full">
            <img :src="currentChat?.conversation.participants[0].profilePic.src" class="rounded-full" />
          </div>

          <!-- show picture conversation -->
          <div class="px-4">
            <p class="">{{ currentChat?.conversation.participants[0].username ?? 'ไม่มีชื่อ' }}</p>
          </div>

        </div>
      </header>


      <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mx-3" id="containMessage"
        ref="conversationRef">
        <div class="grid grid-cols-12">
          <template v-for="(message, index, timestamp) in currentChat?.messages" key="message.messageID">
              
            <!-- Render the message content from user -->
            <template v-if="message.source.userType === 'user'">
              <template v-if="isNewDay(index)">
                <div class="col-start-6 col-end-8 py-8">
                  <div class="flex flex-row">{{ getFormattedDate(message.timestamp) }}</div>
                </div>
              </template>
          

              <div class="col-start-1 col-end-8 pl-3 round-lg" :class="{'py-1' : shouldShowProfilePicture, 'py-0.5' : !shouldShowProfilePicture}">
                <MessageBlock :message="message" :conversation="currentChat!.conversation"
                  :is-show-profile="shouldShowProfilePicture(index)" />
              </div>
            </template>

            <!-- Render the message content from admin -->
            <template v-else>
              <div class="col-start-6 col-end-13 pr-3 rounded-lg" :class="{'py-1' : shouldShowProfilePicture, 'py-0.5' : !shouldShowProfilePicture}">
                <MessageBlock :message="message" :conversation="currentChat!.conversation"
                  :is-show-profile="shouldShowProfilePicture(index)" />
              </div>
            </template>

          </template>
        </div>
      </main>

      <MessageSender />
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
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
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

const isNewDay = (index: number) => {
  if (index === 0) return true;

  const previousMessage = currentChat.value?.messages[index - 1]
  const currentMessage = currentChat.value?.messages[index]

  if (!previousMessage || !currentMessage) return true;

  const previousDay = new Date(previousMessage.timestamp).getUTCDate();
  const currentDay = new Date(currentMessage.timestamp).getUTCDate();


  return previousDay !== currentDay;
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
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('th-TH', options);
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

