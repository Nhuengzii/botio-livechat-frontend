<template>
  <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
  <template v-if="template.elements.length == 1">
    <div class="mx-2 border-2 rounded-xl">
      <div class="rounded-t-xl min-h-44 max-h-56 w-72 overflow-hidden">
        <img :src="template.elements[0].image_url" class="object-cover rounded-t-xl" alt="">
      </div>
      <div class="rounded-b-xl bg-white pb-2 pt-1">
        <div class="pb-2 border-b-2 pl-4">
          <h1 class="font-bold break-all">{{ template.elements[0].title }}</h1>
          <h2 class="break-all">{{ template.elements[0].subtitle }}</h2>
        </div>
        <div class="flex justify-center bg-white border-b-2 py-4 hover:bg-gray-100"
          v-for="button, index in template.elements[0].buttons" :key="index">
          <a :href="button.url" target="_blank" class="text-blue-500">{{ button.title }}</a>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <Carousel :items-to-show="template.elements.length" :wrap-around="false" class="mb-4 rounded-xl">
      <Slide v-for="element, index in template.elements" :key="index">
        <div class="mx-2 border-2 rounded-xl">
          <div class="rounded-t-xl h-64 overflow-hidden">
            <img :src="element.image_url" class="object-cover rounded-t-xl" alt="">
          </div>
          <div class="rounded-b-xl bg-white pb-2 pt-1">
            <div class="pb-2 border-b-2">
              <h1 class="font-bold break-all">{{ element.title }}</h1>
              <h2 class="break-all">{{ element.subtitle }}</h2>
            </div>
            <div class="flex justify-center bg-white border-b-2 py-4 hover:bg-gray-100"
              v-for="button, index in element.buttons" :key="index">
              <a :href="button.url" target="_blank" class="text-blue-500">{{ button.title }}</a>
            </div>
          </div>
        </div>

      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </template>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide, } from 'vue3-carousel'
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
