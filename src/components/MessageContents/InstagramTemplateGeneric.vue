<template>
  <div>
    <!-- <h1>{{ message.attachments }}</h1> -->
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message"
const { message } = defineProps<{
  message: Message
}>()
const template = JSON.parse(message.attachments[0].payload.src)
// console.log(JSON.stringify(template, null, 2))

</script>

<style scoped></style>
