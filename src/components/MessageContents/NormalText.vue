<template>
  <div>
    <div v-if="message.source.userType === 'user'"
      class="self-center  py-2 px-3 shadow rounded-xl  ml-2 text-sm font-medium bg-white break-all overflow-hidden border-2 border-[#D9D9D9]">
      <p>{{ message.message }}</p>
    </div>
    <div v-if="message.source.userType === 'admin'"
      class="self-center relative py-2 px-3 shadow rounded-xl mr-4 text-sm font-medium bg-[#30A2FF] break-all text-white overflow-hidden">
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
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
