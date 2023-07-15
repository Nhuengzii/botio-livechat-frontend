<template>
  <div class="bg-white px-3 py-3 hover:bg-gray-50"
    @click="() => { livechatStore.openChat(conversation.platform, conversation.conversationID); conversation.unread = 0; }"
    :class="currentChat?.conversation.conversationID == conversation.conversationID ? 'bg-gray-300' : ''">
    <ThreadNormal v-if="mode === 'normal'" :conversation="conversation" :show-platform="$route.query.platform === 'all'"
      :update-time-status="updateTimeStatus" />
    <ThreadSearched v-if="mode === 'searching'" :conversation="conversation"
      :show-platform="$route.query.platform === 'all'" :update-time-status="updateTimeStatus" />
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import ThreadNormal from '@/components/ThreadVariants/ThreadNormal.vue'
import ThreadSearched from './ThreadVariants/ThreadSearched.vue';
import { useLivechatStore } from '@/stores/livechat';
import { storeToRefs } from 'pinia';
import { useUIStore } from '@/stores/UI';

const UIStore = useUIStore();

const { conversation, mode } = defineProps<{
  conversation: Conversation
  mode: string
  showPlatform: boolean
}>()

const livechatStore = useLivechatStore()
const { currentChat } = storeToRefs(livechatStore)
livechatStore.markAsReadEventBus.on((readedConversationID) => {
  if (conversation.conversationID === readedConversationID) {
    livechatStore.markAsRead(conversation.platform, conversation.conversationID);
    conversation.unread = 0;
  }
})

const updateTimeStatus = computed(() => {
  return getLastActivity(conversation.updatedTime)
})

const getLastActivity = (timestamp: number) => {
  // const currentTime = Date.now();
  // const timeDifference = currentTime - timestamp;
  // const seconds = Math.floor(timeDifference / 1000);
  // const minutes = Math.floor(seconds / 60);
  // const hours = Math.floor(minutes / 60);
  // const days = Math.floor(hours / 24);

  //  if (days > 0) {
  //    return `เมื่อ ${days} วันที่แล้ว`;
  //  } else if (hours > 0) {
  //    return `เมื่อ ${hours} ชั่วโมงที่แล้ว`;
  //  } else if (minutes > 0) {
  //    return `เมื่อ ${minutes} นาทีที่แล้ว`;
  //  } else {
  //    return `เมื่อไม่กี่วินาทีที่แล้ว`;
  //  }
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours >= 10 ? '' : '0'}${hours}:${minutes >= 10 ? '' : '0'}${minutes}`;
};

</script>

<style scoped></style>
