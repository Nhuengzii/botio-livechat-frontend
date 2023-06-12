<template>
  <div class="bg-sky-50 m-3">
    <h1>This is Message block</h1>
    <template v-if="messageType == 'NormalText'">
      <div>
        <NormalText :message="message" :conversation="conversation" />
      </div>
    </template>
    <template v-else-if="messageType == 'ImageMessage'">
      <div>
        <ImageMessage :message="message" :conversation="conversation" />
      </div>
    </template>
    <template v-else>
      <div>
        <UnsupportMessage :message="message" :conversation="conversation" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';
import NormalText from './MessageContents/NormalText.vue';
import ImageMessage from './MessageContents/ImageMessage.vue';
import UnsupportMessage from './MessageContents/UnsupportMessage.vue';
import { ref } from 'vue';
const { message, conversation } = defineProps<
  {
    message: Message
    conversation: Conversation
  }
>()
const messageType = ref('')
if (message.message.length > 0) {
  messageType.value = 'NormalText'
} else if (message.attachments![0]?.attachmentType) {
  messageType.value = 'ImageMessage'
} else {
  messageType.value = 'Unsupport'
}
</script>

<style scoped></style>
