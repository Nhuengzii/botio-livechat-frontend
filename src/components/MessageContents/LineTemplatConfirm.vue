
<template>
    <div class="rounded-lg flex flex-col w-96 items-center self-center mb-4 mt-2 border-2">
      <div class="flex justify-center border-gray-300 w-full border-b py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg text-base break-all">
        {{ payload.text }} 
      </div>
      <div class="flex bg-white rounded-bl-lg rounded-br-lg w-96">
        <div v-for="action in payload.actions" class="flex justify-center py-6 w-48 rounded-bl-lg rounded-br-lg hover:bg-gray-50" :key="action.label">
          <a :href="action.uri" class="text-blue-500" target="_blank">{{ action.label }}</a>
        </div>
      </div>
    </div>
  
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
import { formatTimestamp } from "@/lib/Time"
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
