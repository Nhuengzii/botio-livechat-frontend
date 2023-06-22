<template>
  <div>
    <div class="bg-blue-500">
      <p> {{ message.message }}</p>
    </div>
    <div class="bg-white">
      <div v-for="button in template.buttons">
        <a :href="button.url" v-if="button.type == 'web_url'">{{ button.title }}</a>
        <button :href="button.url" v-else-if="button.type == 'postback'">{{ button.title }}</button>
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
console.log(JSON.stringify(template, null, 2))
</script>

<style scoped></style>
