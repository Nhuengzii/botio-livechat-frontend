<template>
  <div>
    <h1>This is NormalText</h1>
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
