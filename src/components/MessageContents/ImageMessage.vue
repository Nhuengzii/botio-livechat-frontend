<template>
  <!--User send Message > 1 Image in one time  -->
  <template v-if="amountImage > 1">


    <!-- layout Image like Message  -->
    <div class="grid gap-1 w-full pt-4"
      :class="{ 'grid-cols-3': amountImage >= 3 && amountImage !== 4, 'grid-cols-2': amountImage === 2 || amountImage === 4 }">
      <template v-for="(item, index) in message.attachments">
        <div :class="{
          'h-80': amountImage === 2 || amountImage === 4,
          'h-60': amountImage >= 3 && amountImage < 7,
          'h-52': amountImage >= 7 && amountImage < 13,
          'h-40': amountImage >= 13
        }">

          <template v-if="index == 0 && amountImage <= 3">
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad"
              class="absolute inset-0 object-cover w-full h-full rounded-tl-xl rounded-bl-xl" />
          </template>
          <template v-else-if="index == 0 && amountImage > 3">
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad" class="absolute inset-0 object-cover w-full h-full rounded-tl-xl" />
          </template>
          <template v-else-if="index == (amountImage - 1) && amountImage <= 3">
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad"
              class="absolute inset-0 object-cover w-full h-full rounded-tr-xl rounded-br-xl" />
          </template>
          <template v-else-if="index == 2 && amountImage > 3 && amountImage != 4">
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad" class="absolute inset-0 object-cover w-full h-full rounded-tr-xl " />
          </template>
          <template v-else-if="index == 0 && amountImage > 3">
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad" class="absolute inset-0 object-cover w-full h-full rounded-tl-xl" />
          </template>

          <template v-else-if="index == (amountImage - 1) && amountImage > 3">
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad" class="absolute inset-0 object-cover w-full h-full rounded-br-xl" />
          </template>
          <template v-else>
            <img
              :src="(StatusLoadImg) ? message.attachments[index].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
              alt="" @load="handleImageLoad" class="absolute inset-0 object-cover w-full h-full " />
          </template>
        </div>
      </template>
    </div>

  </template>
  <!-- User send 1 image in one time-->
  <template v-else>
    <div class="max-h-80 max-w-24">
      <img
        :src="(StatusLoadImg) ? message.attachments[0].payload.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png?20220303184432'"
        alt="" @load="handleImageLoad" class="self-center max-h-80 max-w-20 shadow rounded-2xl object-cover  " />
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";
const { message } = defineProps<{
  message: Message
}>()

const imageUrl = ref(message.attachments[0].payload.src)
const amountImage = ref(message.attachments.length)

function error() {
  imageUrl.value = 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'
}
const StatusLoadImg = ref(false);
const handleImageLoad = () => {
  StatusLoadImg.value = true;
}


</script>

<style scoped>.loading.leave {
  opacity: 0;
}</style>
