<template>
  <div>
    <h1>{{ message.attachments[0] }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
const { message } = defineProps<{
  message: Message
}>()
</script>

<style scoped></style>
