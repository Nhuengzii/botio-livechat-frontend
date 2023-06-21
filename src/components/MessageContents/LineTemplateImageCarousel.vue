<template>
  <div class="flex">
    <div v-for="column in payload.columns" class="m-4">
      <div class="relative">
        <img :src="column.imageUrl" class="object-cover rounded-lg">
        <a :href="column.action.uri" class="absolute inset-x-0 bottom-1 bg-black rounded-3xl text-white text-center"
          target="_blank">{{
            column.action.label }}</a>
      </div>
    </div>
  </div>
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
</script>

<style scoped></style>
