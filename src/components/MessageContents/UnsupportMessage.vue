<template>
  <div>
    <h1>THIS Message Type Are Unsupport ({{ message.attachments![0]?.attachmentType }})</h1>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
defineProps<{
  message: Message
}>()
</script>

<style scoped></style>
