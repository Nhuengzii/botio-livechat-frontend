<template>
  <div class="flex">
    <ImageProfileConversation :conversation="conversation" v-if="message.source.userType == 'user'" />
    <video class="max-w-[200px] max-h-[400px]" controls>
      <source :src="message.attachments[0].payload.src" type="video/mp4">
    </video>
    <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
import type { Conversation } from '@/types/conversation'
import ImageProfileConversation from './subs/ImageProfileConversation.vue';
const { message, conversation } = defineProps<{ message: Message, conversation: Conversation }>()
import { formatTimestamp } from "@/lib/Time"
</script>

<style scoped></style>
