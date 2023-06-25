<template>
  <!-- user send message-->
  <template v-if="message.source.userType === 'user'">
    <div class="flex flex-row">
      <template v-if="isShowProfile">
        <ImageProfileConversation :conversation="conversation"/>  
      </template>
      <template v-else>
        <NotshowImageProfile />
      </template>
      <div class="self-center  py-2 px-3 shadow rounded-xl  ml-2 text-sm font-medium bg-white break-all overflow-hidden border-2 border-[#D9D9D9]">
        <div v-html="highlight(message.message,query)"></div>
    </div>
    <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
    </div>
    
    
  </template>
  <!-- end user send message -->

  <!-- admin send message-->
  <template v-else>
    <div class="self-center relative py-2 px-3 shadow rounded-xl mr-4 text-sm font-medium bg-[#30A2FF] break-all text-white overflow-hidden">
      <div v-html="highlight(message.message,query)"></div>
    </div>
    <p class="self-end pr-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
    
  </template>
  
  <!-- end admin send message-->
  
  
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
import NotshowImageProfile from "@/components/MessageContents/subs/NotshowImageProfile.vue";
import ImageProfileConversation from "@/components/MessageContents/subs/ImageProfileConversation.vue"
import { formatTimestamp } from "@/lib/Time"

defineProps<{
  message: Message
  conversation: Conversation
  isShowProfile: boolean
  query:string
}>()

function highlight(text:string,query:string) {
  var regex = new RegExp(query, 'gi');
  text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
  var newText = text.replace(regex, '<mark class="highlight">$&</mark>');
  return newText
            
}




</script>

<style scoped>
.bg-message-admin {
  background-color: #394867;
}

.highlightText {
        background: yellow;
    }
</style>
