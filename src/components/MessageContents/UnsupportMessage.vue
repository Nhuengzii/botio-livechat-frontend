<template>
  <div>
    <h1>THIS Message Type Are Unsupport ({{ message.attachments![0]?.attachmentType }})</h1>
  </div>
  <p class="self-end pr-4 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
  message: Message
  conversation: Conversation
}>()

import { formatTimestamp } from "@/lib/Time"
</script>

<style scoped></style>
