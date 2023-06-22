<template>
    

    <template v-if="amountImage > 1">
      <div class="grid gap-1"
        :class="{ 'grid-cols-3': amountImage >= 3, 'grid-cols-2': amountImage == 2 || amountImage == 4 }">
        <template v-for="(item, index) in message.attachments">
          <div class="h-80">
            <img :src="message.attachments[index].payload.src" alt=""
              class="absolute inset-0 object-cover w-full h-full" />
          </div>
        </template>
        <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-row">
        <ImageProfileConversation :conversation="conversation" />
        <img :src="message.attachments[0].payload.src" alt="" class="self-center relative shadow rounded-2xl" />
      </div>
    </template>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
import { ref } from "vue";
import ImageProfileConversation from "@/components/MessageContents/subs/ImageProfileConversation.vue"
const { message, conversation } = defineProps<{
  message: Message
  conversation: Conversation
  isShowProfile: boolean
}>()
const imageUrl = ref(message.attachments[0].payload.src)
const amountImage = ref(message.attachments.length)

function error() {
  imageUrl.value = 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
</script>

<style scoped></style>
