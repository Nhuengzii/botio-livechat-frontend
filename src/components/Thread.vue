<template>
  <div class="flex bg-red-50  py-4 px-2">
    <img :src=conversation.participants[0].profilePic.src class="h-12 w-12 rounded-full">
    <div class="ml-3 overflow-hidden w-full">
      <p class="text-sm font-bold text-slate-900">{{ conversation.participants[0].username }}</p>
      <div class="grid grid-cols-9 ">
        <div class="col-start-1 col-end-3 ...">{{ conversation.lastActivity }}</div>
        <div class="col-end-7 col-span-2 ...">{{ conversation.updatedTime }}</div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import { onMounted, onUnmounted, ref } from 'vue';
const { conversation } = defineProps<{
  conversation: Conversation
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
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};

</script>

<style scoped></style>
