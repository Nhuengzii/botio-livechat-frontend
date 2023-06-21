<template>
  <div>
    <div class="rounded-t-lg  h-64 overflow-hidden">
      <img :src="payload.thumbnailImageUrl" class="object-contain rounded-t-3xl" alt="">
    </div>
    <div class="rounded-b-lg bg-gray-50 pb-2 pt-1">
      <div class="ml-3 mb-3">
        <h1 class="font-bold">{{ payload.title }}</h1>
        <p>{{ payload.text }}</p>
      </div>
      <hr>
      <div class="flex justify-center my-2 py-1 hover:bg-gray-100" v-for="button in payload.actions">
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
