<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useLivechatStore } from './stores/livechat';
import { useUIStore } from './stores/UI';
const livechatStore = useLivechatStore()
const uiStore = useUIStore();
onMounted(async () => {
  const availablePages = await livechatStore.getShopInformation()
  for (const page of availablePages.available_pages) {
    livechatStore.pageIDMap.set(page.platform_name, page.page_id)
  }
  const allPageInformation = await livechatStore.getAllPageInformation()
  allPageInformation.statuses.forEach((status => {
    uiStore.addAvailablePlatform(status.platform, { unreadConversations: status.unreadConversations, allConversations: status.allConversations })
  }))
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
