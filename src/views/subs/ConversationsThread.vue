<template>
  <div class="flex-1 bg-gray-300 mx-3">
    <div v-for="(conversation, index) in conversations('facebook')" key="conversation.conversationID" class="m-2">
      <Thread :conversation="conversation" :index="index" @click="openChat('facebook', conversation.conversationID)"
        mode="normal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import Thread from '@/components/Thread.vue';
import { storeToRefs } from 'pinia';
const livechatStore = useLivechatStore();
const { conversations } = storeToRefs(livechatStore);

async function openChat(platform: string, conversationID: string) {
  await livechatStore.openChat(platform, conversationID);
}


</script>

<style scoped></style>
