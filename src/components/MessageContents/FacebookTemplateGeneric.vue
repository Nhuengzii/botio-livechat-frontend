<template>
  <div>
    <div class="rounded-t-3xl h-64 overflow-hidden">
      <img :src="template.elements[0].image_url" class="object-contain rounded-t-3xl" alt="">
    </div>
    <div class="rounded-b-3xl bg-gray-200 pb-2 pt-1">
      <div class="ml-3">
        <h1 class="font-bold">{{ template.elements[0].title }}</h1>
        <h2>{{ template.elements[0].subtitle }}</h2>
      </div>
      <div class="flex justify-center bg-white mx-3 my-3 py-1 rounded-xl hover:bg-gray-100">
        <a :href="template.elements[0].buttons[0].url" target="_blank" class="">{{
          template.elements[0].buttons[0].title }}</a>
      </div>
    </div>
  </div>
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
</script>

<style scoped></style>
