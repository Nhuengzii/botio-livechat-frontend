<template>
  <div class="flex-[2] shrink-1 mx-3 background-d9">
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
        <div class="grid grid-cols-12 gap-y-2">
          <template v-for="(message, index) in currentChat?.messages" key="message.messageID">

            <!-- user is send message-->
            <template v-if="message.source.userType === 'user'">
              <div class="col-start-1 col-end-8 p-4 round-lg">
                <MessageBlock :message="message" :conversation="currentChat!.conversation" />
              </div>
            </template>

            <!-- admin is send message-->
            <template v-else>
              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <MessageBlock :message="message" :conversation="currentChat!.conversation" />
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
  if (newTab === null) {
    return;
  }
  if (oldTab === null) {
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

