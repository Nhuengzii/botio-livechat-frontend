<template>
  <div class="flex">
    <ImageProfileConversation :conversation="conversation" v-if="message.source.userType === 'user'" />
    <audio controls>
      <source :src="message.attachments[0].payload.src" type="audio/mpeg">
    </audio>
    <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import type { Message } from '@/types/message';
import ImageProfileConversation from './subs/ImageProfileConversation.vue';
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
const { message, conversation } = defineProps<{ message: Message, conversation: Conversation }>()
</script>

<style scoped></style>
