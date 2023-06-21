<template>
  <!-- USER -->
  <template v-if="message.source.userType === 'user'">

    <!-- user send Text -->
    <template v-if="messageType == 'NormalText'">
      <div class="flex flex-row">

        <template v-if="isShowProfile">
          <ImageProfileConversation :conversation="conversation" class="mr-1" :is-show-pic="isShowProfile" />  
        </template>
        <template v-else>
          <NotshowImageProfile />
        </template>

        <NormalText :message="message" :conversation="conversation" />
        <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{ formatTimestamp(message.timestamp) }}</p>
      </div>
    </template>
    <!-- end-->

    <!-- user send Image -->
    <template v-else-if="messageType == 'ImageMessage'">
      <div class="flex flex-row">

        <template v-if="isShowProfile">
          <ImageProfileConversation :conversation="conversation" class="mr-4" :is-show-pic="isShowProfile"/>  
        </template>
        <template v-else>
          <NotshowImageProfile />
        </template>

        <ImageMessage :message="message" :conversation="conversation" />
        <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(message.timestamp)}}</p>
      </div>
    </template>
    <!-- end-->

    <!-- user send template or unsupportMessage -->
    <template v-else>
      <div>
        <UnsupportMessage :message="message" :conversation="conversation" />
        <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(message.timestamp)}}</p>
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
        <p class="self-end pr-2 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(message.timestamp)}}</p>
      </div>
      
    </template>
    <!-- end-->

    <!-- admin send Image -->
    <template v-else-if="messageType == 'ImageMessage'">
      <div class="flex flex-row-reverse">
        <ImageMessage :message="message" :conversation="conversation" />
        <p class="self-end pr-4 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(message.timestamp)}}</p>
      </div>
    </template>
    <!-- end-->

    <template v-else-if="messageType == 'FacebookTemplateGeneric'">
      <div class="flex flex-row-reverse">
        <FacebookTemplateGeneric :message="message" />
        <p class="self-end pr-4 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(message.timestamp)}}</p>
      </div>
    </template>

    <template v-else-if="messageType == 'LineTemplatButtons'">
      <div>
        <LineTemplatButtons :message="message" />
      </div>
    </template>

    <!-- admin send template or unsupportMessage -->
    <template v-else>
      <div>
        <UnsupportMessage :message="message" :conversation="conversation" />
        <p class="self-end pl-2 pb-1 text-sm text-[#B2B2B2]">{{  formatTimestamp(message.timestamp)}}</p>
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
import { computed, ref } from 'vue';
import ImageProfileConversation from './MessageContents/subs/ImageProfileConversation.vue';
import FacebookTemplateGeneric from './MessageContents/FacebookTemplateGeneric.vue';
import NotshowImageProfile from './MessageContents/subs/NotshowImageProfile.vue';
const { message, conversation } = defineProps<
  {
    message: Message
    conversation: Conversation
    isShowProfile: boolean
  }
>()
const messageType = ref('')
if (message.message.length > 0) {
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

