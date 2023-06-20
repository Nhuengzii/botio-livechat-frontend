<template>
  

  <!-- user send message-->
  <template v-if="message.source.userType === 'user'">
    <div class="flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0">
      <img :src="conversation.participants[0].profilePic.src" alt="" class="object-cover h-12 w-12 rounded-full">
    </div>

    <div class="self-center relative py-2 px-4 shadow rounded-xl ml-4 text-sm bg-white">
      <p class="">{{ message.message }}</p>
    </div>
    <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(conversation.updatedTime )}}</p>
  </template>
  <!-- end user send message -->

  <!-- admin send message-->
  <template v-else>
    <div class="self-center relative py-2 px-4 shadow rounded-xl mr-5 text-sm bg-message-admin text-white">
      <p class="">{{ message.message }}</p>
    </div>
    <p class="self-end pr-2 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(conversation.updatedTime )}}</p>
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
