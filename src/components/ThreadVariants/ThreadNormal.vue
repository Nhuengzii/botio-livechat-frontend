<template>
  <div class="flex">
    <ThreadAvatar :profile-pic="conversation.participants[0].profilePic.src" :show-platform="showPlatform"
      :platform="conversation.platform" />
    <div>
    <div class="flex justify-between ml-3">
      <div>
        <div class="truncate w-40" :class="conversation.unread == 0 ? '' : 'font-bold'">{{ conversation.participants[0].username }}</div>
      </div>
      <div class="text-sm ml-6 mt-1" :class="conversation.unread == 0 ? '' : 'font-bold'">{{ updateTimeStatus }}</div>
    </div>
    <div class="flex justify-between">
      <div class="truncate w-40 ml-3" :class="conversation.unread == 0 ? '' : 'font-bold'"> {{ conversation.lastActivity }}</div>
      <div v-if="conversation.unread != 0" class="bg-[#F05454] rounded-full  text-white px-2  mt-1">{{conversation.unread}}</div>
    </div>
  </div>
  
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
