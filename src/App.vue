<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { useLivechatStore } from './stores/livechat';
import type { Message } from './types/message';
const livechatStore = useLivechatStore()
livechatStore.botioLivechat.websocketClient!.onmessage = (event) => {
  const data: { action: string, data: any } = JSON.parse(event.data)
  switch (data.action) {
    case "relay":
      const message: Message = data.data
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
