<template>
  

  <!-- user send message-->
  <template v-if="message.source.userType === 'user'">
    <!-- <div class="flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0">
      <img :src="conversation.participants[0].profilePic.src" alt="" class="object-cover h-12 w-12 rounded-full">
    </div> -->

    <div class="self-center  py-2 px-3 shadow rounded-xl  ml-2 text-base bg-white break-all overflow-hidden border-2 border-[#D9D9D9]">
      {{ message.message }}
    </div>
    <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
    
  </template>
  <!-- end user send message -->

  <!-- admin send message-->
  <template v-else>
    <div class="self-center relative py-2 px-3 shadow rounded-xl mr-4 text-base bg-[#30A2FF] break-all text-white overflow-hidden">
      {{ message.message }}
    </div>
    <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
    
  </template>
  
  <!-- end admin send message-->
  
  
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
  message: Message
  conversation: Conversation
}>()

const formatTimestamp = (timestamp:number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


</script>

<style scoped>
.bg-message-admin {
  background-color: #394867;
}
</style>
