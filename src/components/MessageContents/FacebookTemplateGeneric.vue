<template>
  <div class="flex">
    <div v-for="element in template.elements">
      <div class="rounded-t-3xl  h-64 overflow-hidden">
        <img :src="element.image_url" class="object-contain rounded-t-3xl" alt="">
      </div>
      <div class="rounded-b-3xl bg-gray-200 pb-2 pt-1">
        <div class="ml-3">
          <h1 class="font-bold">{{ element.title }}</h1>
          <h2>{{ element.subtitle }}</h2>
        </div>
        <div class="flex justify-center bg-white mx-3 my-3 py-1 rounded-xl hover:bg-gray-100"
          v-for="button in element.buttons">
          <a :href="button.url" target="_blank" class="">{{ button.title }}</a>
        </div>
      </div>
    </div>
  </div>
  <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
const { message } = defineProps<{ message: Message }>()
type Template = {
  elements: {
    buttons: {
      title: string,
      type: string,
      url: string,
    }[],
    default_action: {
      type: string,
      url: string,
    },
    image_url: string,
    item_url: string,
    subtitle: string,
    title: string,
  }[],
  "sharable": boolean,
  "template": string,
}
const template: Template = JSON.parse(message.attachments[0].payload.src)
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
</script>

<style scoped></style>
