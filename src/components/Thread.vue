<template>
  <div class="flex bg-red-50  py-4 px-3 mx-3">
    <template v-if="mode === 'normal'">
      <img :src=conversation.participants[0].profilePic.src class="h-14 w-14 rounded-full overflow-hidden">
      <div class="ml-3 overflow-hidden w-full">
        <p class="text-sm font-bold text-slate-900 truncate">{{ conversation.participants[0].username }}</p>
        <div v-if="true" class="flex justify-between mt-1">
          <div class="ptruncate">{{ conversation.lastActivity }}</div>
          <div class="pr-2 truncate">{{ updateTimeStatus }}</div>
        </div>
        <UserTag />
      </div>
    </template>
    <template v-v-else-if="mode === 'collapse'">
      <div>
        <h1>Fuckyou</h1>
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
    return `${days} วันที่ผ่านมา`;
  } else if (hours > 0) {
    return `${hours} ชั่วโมงที่ผ่านมา`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} วินาทีที่ผ่านมา`;
  }
};

</script>

<style scoped></style>
