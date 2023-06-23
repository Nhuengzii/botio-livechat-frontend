<template>
  <template v-if="amountImage > 1">
    <div class="flex mb-3">
      <template v-if="message.source.userType === 'admin'">
        <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
      </template>
      <template v-if="message.source.userType === 'user'">
          <ImageProfileConversation :conversation="conversation" />
      </template>
      <div class="grid gap-1 w-full"
        :class="{ 'grid-cols-3': amountImage >= 3 && amountImage !== 4, 'grid-cols-2': amountImage === 2 || amountImage === 4 }">
        <template v-for="(item, index) in message.attachments">
          <div
            :class="{ 'h-80': amountImage === 2 || amountImage === 4, 'h-64': amountImage >= 3 && amountImage < 7, 'h-56': amountImage >= 7 }">
            <template v-if="index == 0 && amountImage <= 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tl-xl rounded-bl-xl" />
            </template>
            <template v-else-if="index == 0 && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tl-xl" />
            </template>
            <template v-else-if="index == (amountImage - 1) && amountImage <= 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tr-xl rounded-br-xl"/>
            </template>
            <template v-else-if="index == 2 && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tr-xl "/>
            </template>
            <template v-else-if="index == 0 && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tl-xl" />
            </template>
            
            <template v-else-if="index == (amountImage-1) && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-br-xl"/>
            </template>
            <template v-else>
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full"/>
            </template>
          </div>
        </template>
      </div>
      <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
    </div>




  </template>

  <template v-else>
    <div class="flex flex-row">
      <ImageProfileConversation :conversation="conversation" />
      <div class="">
        <img :src="message.attachments[0].payload.src" alt=""
          class="self-center max-h-96 shadow rounded-2xl object-cover" />
      </div>
      <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
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
