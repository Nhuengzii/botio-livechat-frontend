<template>
 
  <div class="flex bg-red-50  py-4 px-2">
    <img :src=conversation.participants[0].profilePic.src class="h-12 w-12 rounded-full">
    <div class="ml-3 overflow-hidden w-full">
        <p class="text-sm font-bold text-slate-900">{{conversation.participants[0].username}}</p>
        <div class="grid grid-cols-9 ">
          <div class="col-start-1 col-end-3 ...">{{conversation.lastActivity}}</div>
          <div class="col-end-7 col-span-2 ...">{{conversation.updatedTime}}</div>
        </div>
        
     </div>
  </div>

  
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
const { conversation } = defineProps<{
  conversation: Conversation
}>()

</script>

<style scoped></style>
