<template>
  <div class="w-96 mt-1 mb-2">
    <div class="bg-blue-400 rounded-t-2xl">
      <p class="px-2 py-3 text-white"> {{ message.message }}</p>
    </div>
    <div class="bg-white">
      <div v-for="button in template.buttons"
        class="flex flex-col py-3 px-1 bg-white text-blue-500 hover:bg-gray-100 items-center border-4">
        <a :href="button.url" v-if="button.type == 'web_url'" class="text-base">{{ button.title }}</a>
        <button :href="button.url" v-else-if="button.type == 'postback'" class="text-base">{{ button.title }}</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Message } from '../../types/message';
const { message } = defineProps<{ message: Message }>()
type FacebookTemplateButton = {
  buttons: {
    title: string,
    type: string,
    url?: string,
    payload?: string,
  }[]
}
const template: FacebookTemplateButton = JSON.parse(message.attachments[0].payload.src);
</script>

<style scoped></style>
