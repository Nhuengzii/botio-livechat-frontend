<template>
  <div class="flex">
    <ThreadAvatar :profile-pic="conversation.participants[0].profilePic.src" :show-platform="showPlatform"
      :platform="conversation.platform" />
    <div class="flex-1 justify-between mx-3">
      <h1 :class="conversation.unread == 0 ? '' : 'font-bold'">{{ conversation.participants[0].username }}
      </h1>
      <p class="truncate w-44" :class="conversation.unread == 0 ? '' : 'font-bold'"> {{ conversation.lastActivity }}</p>
    </div>
    <h1>{{ updateTimeStatus }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import ThreadAvatar from '@/components/ThreadVariants/ThreadAvatar.vue'

const { conversation } = defineProps<{
  conversation: Conversation,
  showPlatform: boolean
  updateTimeStatus: string
}>()
</script>

<style scoped></style>
