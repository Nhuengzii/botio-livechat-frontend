<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useLivechatStore } from './stores/livechat';
import { useUIStore } from './stores/UI';
const livechatStore = useLivechatStore()
const uiStore = useUIStore();
import type { PageInformation } from '@/types/pageInformation'
onMounted(async () => {
  for (const platform of ["facebook", "line", "instagram"]) {
    const information: PageInformation = await livechatStore.getPageInformation(platform)
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
