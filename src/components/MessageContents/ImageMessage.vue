<template>
  <!--User send Message > 1 Image in one time  -->
  <template v-if="amountImage > 1">
    

      <!-- layout Image like Message  -->
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
                class="absolute inset-0 object-cover w-full h-full rounded-tr-xl rounded-br-xl" />
            </template>
            <template v-else-if="index == 2 && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tr-xl " />
            </template>
            <template v-else-if="index == 0 && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-tl-xl" />
            </template>

            <template v-else-if="index == (amountImage - 1) && amountImage > 3">
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-br-xl" />
            </template>
            <template v-else>
              <img :src="message.attachments[index].payload.src" alt=""
                class="absolute inset-0 object-cover w-full h-full" />
            </template>
          </div>
        </template>
      </div>
    
  </template>
  <!-- User send 1 image in one time-->
  <template v-else>
    <div class="max-h-80 max-w-24">
      <img :src="message.attachments[0].payload.src" alt=""
        class="self-center max-h-80 max-w-20 shadow rounded-2xl object-cover " />
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import { ref } from "vue";
const { message } = defineProps<{
  message: Message
}>()
const imageUrl = ref(message.attachments[0].payload.src)
const amountImage = ref(message.attachments.length)

function error() {
  imageUrl.value = 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'
}



</script>

<style scoped></style>
