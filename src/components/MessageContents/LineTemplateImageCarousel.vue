<template>
  <Carousel :items-to-show="2.5" :wrap-around="false" class="mb-4">
    <Slide v-for="(column, index) in payload.columns" :key="index">
      <div class="mx-2">
        <div class="relative">
          
          <img :src="column.imageUrl" class="object-cover rounded-lg">
          <a :href="column.action.uri"
            class="absolute flex items-center justify-center bg-[#000] bottom-4 left-[calc(50%-16px)] rounded-full w-8 h-8 text-white text-center opacity-60" target="_blank">
            <p class="">{{ column.action.label }}</p>
            
          </a>
          
        </div>

      </div>
    </Slide>


    <template #addons>
      <Navigation/>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'
type LineTemplateImageCarousel = {
  payload: {
    altText: string,
    columns: {
      imageUrl: string,
      action: {
        label: string,
        uri: string
      }
    }[]
  },
}
const { message } = defineProps<{
  message: Message
}>()
const template: LineTemplateImageCarousel = JSON.parse(message.attachments[0].payload.src)
const { payload } = template;
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
</script>

<style scoped>
.carousel-line {
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-top: 0.5rem;
}

.prev-button {
  margin-right: 0.5rem;
}

.next-button {
  margin-left: 0.5rem;
}
</style>
