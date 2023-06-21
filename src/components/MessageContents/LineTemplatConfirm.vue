<template>
  <div class="bg-gray-50 pt-2 rounded-lg">
    <h1 class=""> {{ payload.text }}</h1>
    <hr>
    <div class="flex justify-evenly">
      <div v-for="action in payload.actions" class="p-3 hover:bg-gray-100" :key="action.label">
        <a :href="action.uri" class="text-blue-500" target="_blank">{{ action.label }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
const { message } = defineProps<{
  message: Message
}>()
type LineTemplateConfirm = {
  attachmentType: string,
  payload: {
    altText: string,
    text: string,
    actions: {
      label: string,
      uri: string
    }[]
  }
}
const template = JSON.parse(message.attachments[0].payload.src)
const { payload } = template;
</script>

<style scoped></style>
