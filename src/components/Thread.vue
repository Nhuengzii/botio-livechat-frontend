<template>
 
  <div class="flex py-4 px-3  w-50 " :class="[mode === 'normal' ? 'bg-white' : '']">
     <template v-if="mode === 'normal'">
      <img :src=conversation.participants[0].profilePic.src class="h-16 w-16 rounded-full object-cover	">
      <div class="ml-3 overflow-hidden w-full">
        <p class=" font-bold  truncate ml-3 text-base" :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'">
          {{ conversation.participants[0].username }}</p>
        <div v-if="true" class="flex justify-between mt-1 mb-2">
 
          <div class="truncate ml-3 max-w-[100px]" :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'">{{
            conversation.lastActivity }}</div>
          <div class="truncate pr-3 text-sm  " :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'">{{
            updateTimeStatus }}</div>
         </div>
        <UserTag />
      </div>
    </template>
    <template v-else-if="mode === 'collapse'">
      <div>
        <img :src=conversation.participants[0].profilePic.src class="h-14 w-14 rounded-full object-cover	">
      </div>
    </template>
    <template v-else-if="mode === 'searching'">
      <div>
        <h1>Searching</h1>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import { onMounted, onUnmounted, ref } from 'vue';
import UserTag from '@/components/UserTag.vue'
const { conversation, mode } = defineProps<{
  conversation: Conversation
  mode: string
}>()

const updateTimeStatus = ref('')
let _timer: number | null = null;

onMounted(() => {
  updateTimeStatus.value = getLastActivity(conversation.updatedTime)
  _timer = setInterval(() => {
    updateTimeStatus.value = getLastActivity(conversation.updatedTime)
  }, 10000)
})

onUnmounted(() => {
  if (_timer) {
    clearInterval(_timer)
  }
})



const getLastActivity = (timestamp: number) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `เมื่อ ${days} วันที่แล้ว`;
  } else if (hours > 0) {
    return `เมื่อ ${hours} ชั่วโมงที่แล้ว`;
  } else if (minutes > 0) {
    return `เมื่อ ${minutes} นาทีที่แล้ว`;
  } else {
    return `เมื่อ ${seconds} วินาทีที่แล้ว`;
  }
};

</script>

<style scoped></style>
