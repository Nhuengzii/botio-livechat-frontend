
<template>
  <div class="flex items-center justify-end mr-4">
    <div class="pt-2 rounded-lg flex flex-col basis-auto w-96 items-center self-center mb-4 mt-2">
      <div class="flex justify-center border-gray-300 w-full border-b py-4 px-4 bg-gray-100 rounded-tl-xl rounded-tr-xl text-base break-all">
        {{ payload.text }} 
      </div>
      <div class="flex bg-white rounded-bl-xl rounded-br-xl w-96">
        <div v-for="action in payload.actions" class="flex justify-center py-6 w-48 rounded-bl-xl rounded-br-xl hover:bg-gray-50" :key="action.label">
          <a :href="action.uri" class="text-blue-500" target="_blank">{{ action.label }}</a>
        </div>
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
