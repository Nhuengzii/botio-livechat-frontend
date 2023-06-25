
<template>
  <template v-if="template.elements.length == 1">
    <div v-for="element in template.elements" class="">
      <div class="mx-2 border-2 rounded-xl flex">
        <div class="rounded-t-xl min-h-44 max-h-56 w-72 overflow-hidden">
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
    </div>
  </template>
  <template v-else>
    <Carousel :items-to-show="1.5" :wrap-around="false" class="mb-4 rounded-xl"
      :class="{ 'w-80': template.elements.length === 1 }">
      <Slide v-for="element, index in template.elements" :key="index" class="flex flex-col justify-start">
        <div class="mx-2 border-2 rounded-xl">
          <div class="rounded-t-xl  h-48  overflow-hidden bg-gray-100">
            <img :src="element.image_url" class="object-cover rounded-t-xl" alt="">
          </div>
          <div class="rounded-b-xl bg-white pb-2 pt-1">
            <div class="pb-2 border-b-2 flex flex-col items-center justify-start">
              <h1 class="font-bold break-all self-start pl-10">{{ element.title }}</h1>
              <h2 class="break-all self-start pl-10">{{ element.subtitle }}</h2>
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
  <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message"
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide, } from 'vue3-carousel'
const { message } = defineProps<{
  message: Message
}>()
type InstagramTemplateGeneric = {
  elements: {
    buttons: {
      title: string,
      type: string,
      url: string
    }[],
    default_action: {
      type: string,
      url: string
    },
    image_url: string,
    subtitle: string,
    title: string
  }[]
}
const template: InstagramTemplateGeneric = JSON.parse(message.attachments[0].payload.src)
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
</script>

<style scoped></style>
