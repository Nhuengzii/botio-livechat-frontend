<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useLivechatStore } from './stores/livechat';
import { useUIStore } from './stores/UI';
import type { Message } from './types/message';
const livechatStore = useLivechatStore()
const uiStore = useUIStore();
import type { PageInformation } from '@/types/pageInformation'
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
onMounted(async () => {
  for (const platform of ["facebook", "line", "instagram"]) {
    const information: PageInformation = await livechatStore.getPageInformation(platform)
    console.log(`information for ${platform} is ${JSON.stringify(information, null, 2)}`);
    uiStore.availablesPlatforms.set(platform, information)
  }
})
</script>

<template >
  <div class="flex w-screen h-screen">
    <main class="flex flex-col grow mt-2">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
