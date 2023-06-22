<template>
  <Carousel :items-to-show="payload.columns.length" :wrap-around="false" class="mb-4 mt-2">
    <Slide v-for="(column, index) in payload.columns" :key="index">
      <div class="carousel__item mx-2 bg-white rounded-xl">
        <div class="rounded-t-lg  h-64 overflow-hidden">
          <img :src="column.thumbnailImageUrl" class="object-contain rounded-t-3xl" alt="">
        </div>
        <div class="rounded-b-lg bg-white pb-2 pt-1">
          <div class="ml-3 mb-3">
            <h1 class="font-bold break-all mx-2">{{ column.title }}</h1>
            <p class="break-all mx-4">{{ column.text }}</p>
          </div>
          <hr>
          <div class="flex justify-center py-4 hover:bg-gray-50 h-auto" v-for="button in column.actions">
            <a :href="button.uri" target="_blank" class="text-blue-500">{{ button.label }}</a>
          </div>
        </div>
      </div>
    </Slide>


    <template #addons>
      <Navigation />
    </template>
  </Carousel>

</template>


<script setup lang="ts">
import type { Message } from '@/types/message'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
const { message } = defineProps<{
  message: Message
}>()
type LineTemplateCarousel = {
  attachmentType: string,
  payload: {
    altText: string,
    columns: {
      thumbnailImageUrl: string,
      title: string,
      text: string,
      defaultActions: {
        label: string,
        uri: string,
      },
      actions: {
        label: string,
        uri: string,
      }[],
    }[]
  }
}
const template: LineTemplateCarousel = JSON.parse(message.attachments[0].payload.src)
const { payload } = template
</script>


<style scoped></style>
