<template>
  <div>
    <img :src="imageUrl" alt="" class="self-center relative shadow rounded-2xl" @error="error">
  </div>
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
</script>

<style scoped></style>
