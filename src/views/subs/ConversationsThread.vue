<template>
  <div>
    <ThreadUtils :mode="conversationsThreadMode" />
    <div class="flex-1 bg-gray-300 max-w-[400px]">
      <div v-for="(conversation, index) in conversations('facebook')" key="conversation.conversationID" class="m-2">
        <Thread :conversation="conversation" :index="index" @click="openChat('facebook', conversation.conversationID)"
          :mode="conversationsThreadMode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
import ThreadUtils from '@/components/ThreadsUtils.vue';
import { storeToRefs } from 'pinia';
const livechatStore = useLivechatStore();
const uiStore = useUIStore();
const { conversations } = storeToRefs(livechatStore);
const { conversationsThreadMode } = storeToRefs(uiStore)
// conversationsThreadMode.value = 'searching'
async function openChat(platform: string, conversationID: string) {
  await livechatStore.openChat(platform, conversationID);
}


</script>

<style scoped></style>
