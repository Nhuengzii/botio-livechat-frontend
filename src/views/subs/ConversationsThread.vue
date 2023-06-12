<template>
  <div class="flex-1 bg-gray-300">
    <div v-for="(conversation, index) in conversations('facebook')" key="conversation.conversationID" class="m-2">
      <Thread :conversation="conversation" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import Thread from '@/components/Thread.vue';
import { storeToRefs } from 'pinia';
const livechatStore = useLivechatStore();
const { conversations } = storeToRefs(livechatStore);
</script>

<style scoped></style>
