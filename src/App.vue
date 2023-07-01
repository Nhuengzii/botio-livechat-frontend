<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useLivechatStore } from './stores/livechat';
import { useUIStore } from './stores/UI';
const livechatStore = useLivechatStore()
const uiStore = useUIStore();
import type { PageInformation } from '@/types/pageInformation'
onMounted(async () => {
  const availablePages = await livechatStore.getShopInformation()
  for (const page of availablePages.available_pages) {
    uiStore.availablesPlatforms.set(page.platform_name, {
      unreadConversations: 0,
      allConversations: 0,
    })
  }
  console.log(JSON.stringify(availablePages))
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
