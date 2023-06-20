<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useLivechatStore } from './stores/livechat';
import type { Message } from './types/message';

const livechatStore = useLivechatStore();
livechatStore.botioLivechat.websocketConnection.onmessage = (event) => {
  console.log(event)
  console.log(JSON.stringify(event, null, 2))
  const data: { action: string, data: Message } = JSON.parse(event.data);
  console.log(data)
  if (data.action === 'relay') {
    livechatStore.addReceivedMessage(data.data);
  }
};

</script>

<template >
  <div class="flex w-screen h-screen">
    <main class="flex flex-col grow">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
