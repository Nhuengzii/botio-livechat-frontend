<template>
  <div class="mb-4 mt-2 w-80">
    <div class="rounded-t-lg h-56 overflow-hidden object-cover">
      <img :src="payload.thumbnailImageUrl" class="object-contain rounded-t-3xl" alt="">
    </div>
    <div class="rounded-b-lg bg-white pb-2 pt-1">
      <div class="ml-3 mb-3">
        <h1 class="font-bold">{{ payload.title }}</h1>
        <p>{{ payload.text }}</p>
      </div>
      <hr>
      <div class="flex justify-center mb-2 py-4 hover:bg-gray-50" v-for="button in payload.actions">
        <a :href="button.uri" target="_blank" class="text-blue-500">{{ button.label }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
const { message } = defineProps<{
  message: Message
}>()
type LineTemplateButton = {
  attachmentType: string,
  payload: {
    altText: string,
    thumbnailImageUrl: string,
    title: string,
    text: string,
    defaultAction: {
      label: string,
      uri: string
    },
    actions: {
      label: string,
      uri: string
    }[]
  }
}
const template: LineTemplateButton = JSON.parse(message.attachments[0].payload.src);
const { payload } = template;
</script>

<style scoped></style>
