<template>
  <!-- user send-->
  <template v-if="message.source.userType === 'user'">
    <template v-if="messageType == 'NormalText'">
        <div class="flex flex-row">
          <NormalText :message="message" :conversation="conversation" />
        </div>
    </template>

    <template v-else-if="messageType == 'ImageMessage'">
      <div class="flex flex-row">
        <ImageProfileConversation :conversation="conversation" class="mr-5"/>
        <ImageMessage :message="message" :conversation="conversation" />
      </div>
    </template>
    <template v-else>
      <div>
        <UnsupportMessage :message="message" :conversation="conversation" />
      </div>
    </template>
  </template>

  <!-- admin -->
  <template v-else>
    <template v-if="messageType == 'NormalText'">
        <div class="flex items-center justify-start flex-row-reverse">
          <ImageProfileConversation :conversation="conversation"/>
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
  </template>
    
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';
import NormalText from './MessageContents/NormalText.vue';
import ImageMessage from './MessageContents/ImageMessage.vue';
import UnsupportMessage from './MessageContents/UnsupportMessage.vue';
import { ref } from 'vue';
import ImageProfileConversation from './MessageContents/subs/ImageProfileConversation.vue';
const { message, conversation } = defineProps<
  {
    message: Message
    conversation: Conversation
    userType: string
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
