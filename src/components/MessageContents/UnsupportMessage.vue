<template>
  <div>
    <h1>THIS Message Type Are Unsupport ({{ message.attachments![0]?.attachmentType }})</h1>
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
