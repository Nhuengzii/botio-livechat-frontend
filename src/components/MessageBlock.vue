<template>
  <div>
    <h1>This is Message block</h1>
    <h1>This is me {{ message }}</h1>
    <h1>From {{ conversation }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';
const { message, conversation } = defineProps<
  {
    message: Message
    conversation: Conversation
  }
>()
</script>

<style scoped></style>
