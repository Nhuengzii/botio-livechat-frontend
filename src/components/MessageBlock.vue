<template>
  <div class="flex flex-row">
    <div v-if="message.source.userType === 'admin'" class="mr-3">{{ formatTimestamp(message.timestamp) }}</div>
    <ImageProfileConversation :conversation="conversation" v-if="message.source.userType === 'user'" />
    <NormalText :message="message" v-if="messageType === 'NormalText'" />
    <div v-if="message.source.userType === 'user'" class="ml-3">{{ formatTimestamp(message.timestamp) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';
import NormalText from './MessageContents/NormalText.vue';
import ImageMessage from './MessageContents/ImageMessage.vue';
import UnsupportMessage from './MessageContents/UnsupportMessage.vue';
import LineTemplatButtons from './MessageContents/LineTemplatButtons.vue';
import LineTemplateImageCarousel from './MessageContents/LineTemplateImageCarousel.vue';
import { computed, ref } from 'vue';
import ImageProfileConversation from './MessageContents/subs/ImageProfileConversation.vue';
import FacebookTemplateGeneric from './MessageContents/FacebookTemplateGeneric.vue';
import LineTemplateConfirm from './MessageContents/LineTemplatConfirm.vue';
import LineTemplateCarousel from './MessageContents/LineTemplateCarousel.vue';
import InstagramTemplateGeneric from './MessageContents/InstagramTemplateGeneric.vue';
import InstagramTemplateProduct from './MessageContents/InstagramTemplateProduct.vue';
import FacebookTemplateButton from './MessageContents/FacebookTemplateButton.vue';
import AudioMessage from './MessageContents/AudioMessage.vue';
import VideoMessage from './MessageContents/VideoMessage.vue';
import DeletedMessage from './MessageContents/DeletedMessage.vue';

const { message, conversation } = defineProps<
  {
    message: Message
    conversation: Conversation
    isShowProfile: boolean
    query: string
  }
>()
const messageType = ref('')
if (message.message.length > 0 && message.attachments.length == 0) {
  messageType.value = 'NormalText'
} else if (message.isDeleted) {
  messageType.value = 'DeletedMessage'
}
else if (message.attachments.length == 0) {
  messageType.value = 'Unsupport'
} else if (message.attachments[0].attachmentType == 'image') {
  messageType.value = 'ImageMessage'
} else if (message.attachments[0].attachmentType == 'sticker') {
  messageType.value = 'ImageMessage'
} else if (message.attachments[0].attachmentType == 'audio') {
  messageType.value = 'AudioMessage'
} else if (message.attachments[0].attachmentType == 'video') {
  messageType.value = 'VideoMessage'
}
else if (message.attachments[0].attachmentType == 'facebook-template-generic') {
  messageType.value = 'FacebookTemplateGeneric'
} else if (message.attachments[0].attachmentType == 'line-template-buttons') {
  messageType.value = 'LineTemplatButtons'
} else if (message.attachments[0].attachmentType == 'line-template-image-carousel') {
  messageType.value = 'LineTemplateImageCarousel'
} else if (message.attachments[0].attachmentType == 'line-template-confirm') {
  messageType.value = 'LineTemplatConfirm'
} else if (message.attachments[0].attachmentType == 'line-template-carousel') {
  messageType.value = 'LineTemplateCarousel'
} else if (message.attachments[0].attachmentType == 'instagram-template-generic') {
  messageType.value = 'InstagramTemplateGeneric'
} else if (message.attachments[0].attachmentType == 'instagram-template-product') {
  messageType.value = 'InstagramTemplateProduct'
} else if (message.attachments[0].attachmentType == 'facebook-template-button') {
  messageType.value = 'FacebookTemplateButton'
}
else if (message.attachments[0].attachmentType) {
  messageType.value = 'Unsupport'
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

</script>

<style scoped></style>

