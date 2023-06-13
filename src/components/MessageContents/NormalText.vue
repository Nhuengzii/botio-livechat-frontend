<template>
  

  <!-- user send message-->
  <template v-if="message.source.userType === 'user'">
    <div class="flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0">
      <img :src="conversation.participants[0].profilePic.src" alt="" class="object-cover h-12 w-12 rounded-full">
    </div>

    <div class="self-center relative py-2 px-4 shadow rounded-xl ml-4 text-sm bg-white">
      <h1>{{ message.message }}</h1>
    </div>
  </template>

  <!-- admin send message-->
  <template v-else>
    <div class="self-center relative py-2 px-4 shadow rounded-xl mr-5 text-sm bg-message-admin text-white">
      <h1>{{ message.message }}</h1>
    </div>
  </template>
  
  
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
  message: Message
  conversation: Conversation
}>()
</script>

<style scoped>
.bg-message-admin {
  background-color: #394867;
}
</style>
