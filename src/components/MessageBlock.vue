<template>
  <div :class="{
    'flex flex-row-reverse py-1': message.source.userType === 'admin',
    'flex flex-row': message.source.userType !== 'admin',
    'py-0.5': !isShowProfile,
    'pt-6': isShowProfile
  }" class="items-start">
    <ImageProfileConversation :conversation="conversation" v-if="message.source.userType === 'user' && isShowProfile" />
    <NotshowImageProfile v-if="message.source.userType === 'user' && !isShowProfile" />
    <AudioMessage :message="message" v-if="messageType === 'AudioMessage'" />
    <DeletedMessage :message="message" v-else-if="messageType === 'DeletedMessage'" />
    <FacebookTemplateButton :message="message" v-else-if="messageType === 'FacebookTemplateButton'" />
    <FacebookTemplateGeneric :message="message" v-else-if="messageType === 'FacebookTemplateGeneric'" />
    <ImageMessage :message="message" v-else-if="messageType === 'ImageMessage'" />
    <InstagramTemplateGeneric :message="message" v-else-if="messageType === 'InstagramTemplateGeneric'" />
    <InstagramTemplateProduct :message="message" v-else-if="messageType === 'InstagramTemplateProduct'" />
    <LineTemplatButtons :message="message" v-else-if="messageType === 'LineTemplatButtons'" />
    <LineTemplateConfirm :message="message" v-else-if="messageType === 'LineTemplatConfirm'" />
    <LineTemplateCarousel :message="message" v-else-if="messageType === 'LineTemplateCarousel'" />
    <LineTemplateImageCarousel :message="message" v-else-if="messageType === 'LineTemplateImageCarousel'" />
    <NormalText :message="message" v-else-if="messageType === 'NormalText'" />
    <VideoMessage :message="message" v-else-if="messageType === 'VideoMessage'" />
    <UnsupportMessage :message="message" v-else />
    <div v-if="message.source.userType === 'user'" class="ml-3 text-sm text-[#B2B2B2] self-end">{{
      formatTimestamp(message.timestamp) }}</div>
    <div v-else class="mr-3 align-bottom text-sm text-[#B2B2B2] self-end">{{ formatTimestamp(message.timestamp) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';
import { ref } from 'vue';
import { formatTimestamp } from '@/lib/Time';
import NormalText from './MessageContents/NormalText.vue';
import ImageMessage from './MessageContents/ImageMessage.vue';
import UnsupportMessage from './MessageContents/UnsupportMessage.vue';
import LineTemplatButtons from './MessageContents/LineTemplatButtons.vue';
import LineTemplateImageCarousel from './MessageContents/LineTemplateImageCarousel.vue';
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
import NotshowImageProfile from './MessageContents/subs/NotshowImageProfile.vue';

const { message, conversation } = defineProps<
  {
    message: Message
    conversation: Conversation
    isShowProfile: boolean
  }
>()
const messageType = ref('')
if (message.message.length > 0 && message.attachments.length == 0) {
  messageType.value = 'NormalText'
} else if (message.isDeleted) {
  messageType.value = 'DeletedMessage'
} else if (message.attachments.length == 0) {
  messageType.value = 'Unsupport'
} else if (message.attachments[0].attachmentType == 'image') {
  messageType.value = 'ImageMessage'
} else if (message.attachments[0].attachmentType == 'sticker') {
  messageType.value = 'ImageMessage'
} else if (message.attachments[0].attachmentType == 'audio') {
  messageType.value = 'AudioMessage'
} else if (message.attachments[0].attachmentType == 'video') {
  messageType.value = 'VideoMessage'
} else if (message.attachments[0].attachmentType == 'facebookTemplateGeneric') {
  messageType.value = 'FacebookTemplateGeneric'
} else if (message.attachments[0].attachmentType == 'lineTemplateButtons') {
  messageType.value = 'LineTemplatButtons'
} else if (message.attachments[0].attachmentType == 'lineTemplateImageCarousel') {
  messageType.value = 'LineTemplateImageCarousel'
} else if (message.attachments[0].attachmentType == 'lineTemplateConfirm') {
  messageType.value = 'LineTemplatConfirm'
} else if (message.attachments[0].attachmentType == 'lineTemplateCarousel') {
  messageType.value = 'LineTemplateCarousel'
} else if (message.attachments[0].attachmentType == 'instagramTemplateGeneric') {
  messageType.value = 'InstagramTemplateGeneric'
} else if (message.attachments[0].attachmentType == 'instagramTemplateProduct') {
  messageType.value = 'InstagramTemplateProduct'
} else if (message.attachments[0].attachmentType == 'facebookTemplateButton') {
  messageType.value = 'FacebookTemplateButton'
} else if (message.attachments[0].attachmentType) {
  messageType.value = 'Unsupport'
}



</script>

<style scoped></style>

