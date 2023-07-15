<template>
  <div>
    <audio controls>
      <source :src="message.attachments[0].payload.src" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
const { message } = defineProps<{ message: Message }>()
</script>

<style scoped></style>
