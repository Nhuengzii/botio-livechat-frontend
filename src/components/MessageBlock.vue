<template>
  <!-- USER -->
  <template v-if="message.source.userType === 'user'">

    <!-- user send Text -->
    <template v-if="messageType == 'NormalText'">
        <div class="flex flex-row">
          <NormalText :message="message" :conversation="conversation" />
        </div>
    </template>
    <!-- end-->

    <!-- user send Image -->
    <template v-else-if="messageType == 'ImageMessage'">
      <div class="flex flex-row">
        <ImageProfileConversation :conversation="conversation" class="mr-5"/>
        <ImageMessage :message="message" :conversation="conversation" />
      </div>
    </template>
    <!-- end-->

    <!-- user send template or unsupportMessage -->
    <template v-else>
      <div>
        <UnsupportMessage :message="message" :conversation="conversation" />
      </div>
    </template>
    <!-- end-->

  </template>

  <!-- ADMIN -->
  <template v-else>
    
    <!-- admin send Text -->
    <template v-if="messageType == 'NormalText'">
        <div class="flex items-center justify-start flex-row-reverse">
          <NormalText :message="message" :conversation="conversation" />
        </div>
    </template>
    <!-- end-->

    <!-- admin send Image -->
    <template v-else-if="messageType == 'ImageMessage'">
      <div>
        <ImageMessage :message="message" :conversation="conversation" />
      </div>
    </template>
    <!-- end-->

    <!-- admin send template or unsupportMessage -->
    <template v-else>
      <div>
        <UnsupportMessage :message="message" :conversation="conversation" />
      </div>
    </template>
    <!-- end-->
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
  }
>()
const messageType = ref('')
if (message.message.length > 0) {
  messageType.value = 'NormalText'
  console.log("if :::")
} else if (message.attachments![0]?.attachmentType) {
  messageType.value = 'ImageMessage'
  console.log("else if ::")
} else {
  messageType.value = 'Unsupport'
  console.log("else ::")
}
</script>

<style scoped></style>
