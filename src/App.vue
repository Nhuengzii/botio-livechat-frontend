<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useLivechatStore } from './stores/livechat';
import type { Message } from './types/message';
const livechatStore = useLivechatStore()
livechatStore.botioLivechat.websocketClient!.onmessage = (event) => {
  const data: { action: string, message: any } = JSON.parse(event.data)
  console.log(data)
  switch (data.action) {
    case "broadcast":
    case "relay":
      const message: Message = data.message
      livechatStore.receiveMessage(message)
      break;
    default:
      alert("unknown action")
  }
}
</script>

<template >
  <div class="flex w-screen h-screen">
    <main class="flex flex-col grow">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
