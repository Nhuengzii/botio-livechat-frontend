<template>
  <!-- if template is has 1 item -->
  <template v-if="template.elements.length == 1">
    <button @click="onClickTemplate(template.elements[0].default_action.url)">
      <div class="mx-2 my-2 border-2 rounded-xl">
        <template v-if="template.elements[0].image_url">
          <div class="rounded-t-xl h-48 w-80 overflow-hidden">
            <img :src="template.elements[0].image_url" class="object-cover rounded-t-xl" alt="" @error="handleImageError(template.elements[0].image_url)">
          </div>
        </template>
        <div class="rounded-b-xl bg-white pt-1">
          <div class="flex flex-col justify-center items-start pb-2 border-b-2 pl-4 min-w-[120px] max-w-[320px]">
            <p class="break-all text-gray-400 pt-1 pb-2">{{ template.elements[0].default_action.url }}</p>
            
            <h1 class="font-bold break-all truncate">{{ template.elements[0].title }}</h1>
            <p class="break-all text-ellipsis">{{ template.elements[0].subtitle }}</p>
          </div>
          <div class="flex col justify-center bg-white py-4 border-b-2 hover:bg-gray-100"
            v-for="button, index in template.elements[0].buttons" :key="index">
            <a :href="button.url" target="_blank" class="text-blue-500">{{ button.title }}</a>
          </div>
        </div>
      </div>
    </button>
  </template>

  <!-- if template is has more 1 items -->
  <template v-else>
    <!-- Carousel  -->
    <Carousel :items-to-show="2" :wrap-around="false" class="mb-4 rounded-xl">
      <Slide v-for="element, index in template.elements" :key="index" class="flex flex-col justify-start">
        <button @click="onClickTemplate(element.default_action.url)">
          <div class="mx-2 my-2 border-2 rounded-xl">

            <!-- Image Section -->
            <template v-if="element.image_url">   
              <div class="rounded-t-xl h-48 w-80 overflow-hidden">
                <img :src="element.image_url" class="object-cover rounded-t-xl" alt="" @error="handleImageError(element.image_url)">
              </div>
            </template>

            <!-- section Title & subTitle -->
            <div class="rounded-b-xl bg-white pb-2 pt-1">
              <div class="pb-2 border-b-2 pl-4 min-1-w-[120px] max-w-[320px] flex flex-col items-center">
                <p class="break-all self-start pl-8 pb-4 text-gray-400">{{ element.default_action.url }}</p>
                <h1 class="font-bold break-all self-start pl-8 pb-4 truncate ">{{ element.title }}</h1>
                <p class="break-all self-start pl-8 pb-2">{{ element.subtitle }}</p>
              </div>

              <!-- section button -->
              <div class="flex justify-center bg-white border-b-2 py-4 hover:bg-gray-100"
                v-for="button, index in element.buttons" :key="index">
                <a :href="button.url" target="_blank" class="text-blue-500">{{ button.title }}</a>
              </div>
            </div>
          </div>
        </button>

      </Slide>
      <!-- click to next & previous Item in Carousel  -->
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
import { formatTimestamp } from "@/lib/Time"
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

const handleImageError = (imageUrl:String) => {
  imageUrl= 'https://th.bing.com/th/id/OIP.2Sw7OWq_1hrOdTrBraUFIgAAAA?pid=ImgDet&rs=1'
}

const onClickTemplate = (link_url:string) => {
  window.open(link_url)
}

</script>

<style scoped></style>
