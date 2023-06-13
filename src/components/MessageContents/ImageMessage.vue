<template>
  <div>
    <!-- <h1 :src="message.attachments"></h1> -->
    <img :src="message.attachments![0].payload.src" alt="">
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
  message: Message
  conversation: Conversation
}>()
</script>

<style scoped></style>
