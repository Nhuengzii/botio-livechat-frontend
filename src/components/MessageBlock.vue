<template>
  <!-- USER -->
  <template v-if="message.source.userType === 'user'">

    <!-- user send Text -->
    <template v-if="messageType == 'NormalText'">
      <div class="flex flex-row">
        <NormalText :message="message" :conversation="conversation" :is-show-profile="isShowProfile" />
      </div>
    </template>
    <!-- end-->

    <!-- user send Image -->
    <template v-else-if="messageType == 'ImageMessage'">
      <ImageMessage :message="message" :conversation="conversation" :is-show-profile="isShowProfile" />
    </template>
    <!-- end-->

    <!-- user send template or unsupportMessage -->
    <template v-else>
      <div class="flex flex-row">
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
        <NormalText :message="message" :conversation="conversation" :is-show-profile="isShowProfile" />
      </div>

    </template>
    <!-- end-->

    <!-- admin send Image -->
    <template v-else-if="messageType == 'ImageMessage'">
      <div class="flex flex-row-reverse">
        <ImageMessage :message="message" :conversation="conversation" :is-show-profile="isShowProfile" />
      </div>
    </template>
    <!-- end-->

    <template v-else-if="messageType == 'FacebookTemplateGeneric'">
      <div class="flex items-center justify-end mr-4">
        <FacebookTemplateGeneric :message="message" />
      </div>
        
    </template>

    <template v-else-if="messageType == 'FacebookTemplateButton'">
      <FacebookTemplateButton :message="message" />
    </template>

    <template v-else-if="messageType == 'LineTemplatButtons'">
      <div class="flex items-center justify-end mr-4">
        <LineTemplatButtons :message="message" />
      </div>
    </template>

    <template v-else-if="messageType == 'LineTemplateImageCarousel'">
      <div>
        <LineTemplateImageCarousel :message="message" />
      </div>
    </template>

    <template v-else-if="messageType == 'LineTemplatConfirm'">
      <div class="flex items-center justify-end mr-4">
        <LineTemplateConfirm :message="message" />
      </div>
    </template>
    <template v-else-if="messageType == 'LineTemplateCarousel'">
      <div class="flex items-center justify-end mr-4">
        <LineTemplateCarousel :message="message" />
      </div>
      
    </template>
    <template v-else-if="messageType == 'InstagramTemplateGeneric'">
      <div class="flex items-center justify-end mr-4">
        <InstagramTemplateGeneric :message="message" />
      </div>
    </template>
    <template v-else-if="messageType == 'InstagramTemplateProduct'">
      <div>
        <InstagramTemplateProduct :message="message" />
      </div>
    </template>

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
} else if (message.attachments.length == 0) {
  messageType.value = 'Unsupport'
} else if (message.attachments[0].attachmentType == 'image') {
  messageType.value = 'ImageMessage'
} else if (message.attachments[0].attachmentType == 'sticker') {
  messageType.value = 'ImageMessage'
} else if (message.attachments[0].attachmentType == 'facebook-template-generic') {
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

