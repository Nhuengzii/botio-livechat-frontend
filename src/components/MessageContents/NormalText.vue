<template>
  <div>
    <p class="bg-sky-50">{{ message.message }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
import NotshowImageProfile from "@/components/MessageContents/subs/NotshowImageProfile.vue";
import ImageProfileConversation from "@/components/MessageContents/subs/ImageProfileConversation.vue"
import { formatTimestamp } from "@/lib/Time"

defineProps<{
  message: Message
}>()

function highlight(text: string, query: string) {
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
