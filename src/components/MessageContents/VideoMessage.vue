<template>
  <div>
    <video class="max-w-[200px] max-h-[400px] rounded-xl" controls>
      <source :src="message.attachments[0].payload.src" type="video/mp4">
    </video>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
const { message } = defineProps<{ message: Message }>()
</script>

<style scoped></style>
