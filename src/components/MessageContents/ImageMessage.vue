<template>

  <div v-for="(item ,index) in message.attachments">
    <!-- <img :src="imageUrl" alt="" class="object-cover shadow rounded-2xl" @error="error"> -->
    <img :src="message.attachments[index].payload.src" alt="" class="object-cover">
  </div>
  <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
import { ref } from "vue";
const { message, conversation } = defineProps<{
  message: Message
  conversation: Conversation
}>()
const imageUrl = ref(message.attachments[0].payload.src)

function error() {
  imageUrl.value = 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
</script>

<style scoped></style>
