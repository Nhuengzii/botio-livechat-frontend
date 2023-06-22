<template>
  <div class="flex items-center justify-end mr-4">
    <Carousel :items-to-show="template.elements.length" :wrap-around="false" class="mb-4 rounded-xl"
      :class="{ 'w-80': template.elements.length === 1 }">
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
            <div class="flex justify-center bg-white border-b-2 py-4 hover:bg-gray-100" v-for="button, index in element.buttons"
              :key="index">
              <a :href="button.url" target="_blank" class="text-blue-500">{{ button.title }}</a>
            </div>
          </div>
        </div>

      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
  <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>


  <!-- <Carousel :items-to-show="2.5" :wrap-around="false" class="mb-4">
    <Slide v-for="element in template.elements">
      <div class="carousel__item mx-2">
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
    </Slide>
    <template #addons>
      <Navigation/>
    </template>
  </Carousel> -->
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
