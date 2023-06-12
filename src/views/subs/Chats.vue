<template>
  <div class="flex-[2] bg-green-200">
    <vue3-tabs-chrome :ref="setTabRef" :tabs="tabs" v-model="tab" @click="handleClick" @remove="handleRemoveTab" />
    <template v-if="currentFocusChat.length === 0">
      <h1>There are no chat opened</h1>
    </template>
    <template v-else>
      <div v-for="(message, index) in currentChat?.messages" key="message.messageID">
        <MessageBlock :message="message" :conversation="currentChat!.conversation" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from "@/stores/livechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import { storeToRefs } from "pinia";
import { ref, type Ref } from "vue";
import Vue3TabsChrome, { type Tab } from "vue3-tabs-chrome"
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
import MessageBlock from "@/components/MessageBlock.vue";
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
</script>

<style scoped></style>

