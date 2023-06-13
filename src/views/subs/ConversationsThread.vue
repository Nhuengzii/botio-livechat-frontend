<template>
  <template v-if="conversationsThreadMode == 'normal'">
    <div class="flex-1 bg-gray-300">
      <div v-for="(conversation, index) in conversations('facebook')" key="conversation.conversationID" class="m-2">
        <Thread :conversation="conversation" :index="index" @click="openChat('facebook', conversation.conversationID)"
          mode="normal" />
      </div>
    </div>
  </template>
  <template v-else-if="conversationsThreadMode == 'collapse'">
    <div>
      <div v-for="(conversation, index) in conversations('facebook')" key="conversation.conversationID" class="m-2">
        <Thread :conversation="conversation" :index="index" @click="openChat('facebook', conversation.conversationID)"
          mode="collapse" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
import { storeToRefs } from 'pinia';
const livechatStore = useLivechatStore();
const uiStore = useUIStore();
const { conversations } = storeToRefs(livechatStore);
const { conversationsThreadMode } = storeToRefs(uiStore)
//conversationsThreadMode.value = 'collapse';

async function openChat(platform: string, conversationID: string) {
  await livechatStore.openChat(platform, conversationID);
}


</script>

<style scoped></style>
