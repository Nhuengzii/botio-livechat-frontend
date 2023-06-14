<template>
  <div class="flex-[2] shrink-1 mx-3 background-d9">
    <div class="flex flex-col w-full h-full">

      <!-- header chats-->
      <header class="bg-white flex-[2] mx-3 mb-4">
        <Vue3TabsChrome :ref="setTabRef" :tabs="tabs" v-model="tab" @click="handleClick" @remove="handleRemoveTab" class="background-d9"/>
        <div class="flex items-center py-5">

          <!-- show name conversation-->
          <div class="mx-3 object-cover h-12 w-12 rounded-full">
            <img :src="currentChat?.conversation.conversationPic.src" class="rounded-full"/>
          </div> 

          <!-- show picture conversation -->
          <div class="px-4">
            <p class="">{{ currentChat?.conversation.participants[0].username }}</p>
          </div>

        </div>
      </header>

      <template v-if="currentFocusChat.length === 0">
        <h1>There are no chat opened</h1>
      </template>

      <template v-else>
        <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mx-3">
          <div class="grid grid-cols-12 gap-y-2">
            <template v-for="(message, index) in currentChat?.messages" key="message.messageID">

              <!-- user is send message-->
              <template v-if="message.source.userType === 'user'">
                <div class="col-start-1 col-end-8 p-4 round-lg">
                  <MessageBlock :message="message" :conversation="currentChat!.conversation" :userType="message.source.userType"/>
                </div>
              </template>
              

              <!-- admin is send message-->
              <template v-else >
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <MessageBlock :message="message" :conversation="currentChat!.conversation" :userType="message.source.userType"/>
                </div>
              </template>
              
              
            </template>
          </div>
        </main>

        <MessageSender />
      </template>
    </div>
    

      

    
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from "@/stores/livechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref, type Ref, onBeforeMount } from "vue";
import Vue3TabsChrome, { type Tab } from "vue3-tabs-chrome"
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
import MessageBlock from "@/components/MessageBlock.vue";
import MessageSender from "@/components/MessageSender.vue";
import ImageProfileConversation from "@/components/MessageContents/subs/ImageProfileConversation.vue";
const livechatStore = useLivechatStore()
const { openChatEventBus } = storeToRefs(livechatStore)
const tab = ref('')
const currentFocusChat = ref("")
const currentChat = ref<{ conversation: Conversation, messages: Message[] }>()
const tabs = ref([
] as Tab[])
const tabRef = ref()
const setTabRef = (el: HTMLElement) => {
  tabRef.value = el
}

function handleClick(event: Event, tab: Tab, index: number) {
  currentFocusChat.value = tab.key
  currentChat.value = livechatStore.getChat(tab.key)
}

function handleRemoveTab(tab: Tab, index: number) {
  if (tab.key === currentFocusChat.value) {
    currentFocusChat.value = ""
  }
  livechatStore.closeChat(tab.key)
}

function openChat(newChat: { conversation: Conversation, messages: Message[] }) {
  if (livechatStore.getChat(newChat.conversation.conversationID)) {
    return
  }
  currentChat.value = newChat
  if (tabs.value.length === 0) {
    tabs.value = [{
      label: newChat.conversation.participants[0].username,
      key: newChat.conversation.conversationID,
      favico: newChat.conversation.conversationPic.src
    } as Tab]
    currentFocusChat.value = newChat.conversation.conversationID
  }
  if (tabRef.value == null) {
    console.log("ERRRRRR")
    return
  }
  tabRef.value.addTab({
    label: newChat.conversation.participants[0].username,
    key: newChat.conversation.conversationID,
    favico: newChat.conversation.conversationPic.src
  } as Tab)
}
openChatEventBus.value.on(openChat)


// const scrollToBottom = () => {
//   let objContain = document.getElementById("containMessage") as any
//   objContain.scrollTop = objContain?.scrollHeight
// }

// onUpdated(() => {
//     scrollToBottom()
// })

// onBeforeMount(() => {
//   scrollToBottom()
// })

</script>

<style scoped>
  .background-d9 {
    background-color: rgba(217,217,217,0.3);
    
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>

