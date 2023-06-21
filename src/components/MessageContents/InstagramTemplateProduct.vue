<template>
  <div>
    <div class="rounded-t-3xl h-64 overflow-hidden">
      <img :src="template.generic.elements[0].image_url" class="object-contain rounded-t-3xl" alt="">
    </div>
    <div class="rounded-b-3xl bg-gray-200 pb-2 pt-1">
      <div class="ml-3">
        <h1 class="font-bold">{{ template.generic.elements[0].title }}</h1>
        <h2>{{ template.generic.elements[0].subtitle }}</h2>
      </div>
      <div class="flex justify-center bg-white mx-3 my-3 py-1 rounded-xl hover:bg-gray-100">
        <a :href="button.url" v-for="button in template.generic.elements[0].buttons" target="_blank" class="">{{
          button.title }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO - in only show first template
import type { Message } from "@/types/message"
const { message } = defineProps<{
  message: Message
}>()
type InstagramTemplateProduct = {
  generic: {
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
}
const template: InstagramTemplateProduct = JSON.parse(message.attachments[0].payload.src)
</script>

<style scoped></style>
