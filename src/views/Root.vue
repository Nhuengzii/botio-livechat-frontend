<template>
  <div>
    <h1>THIS is Root View</h1>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const livechatStore = useLivechatStore()
const router = useRouter()
function findShopID() {
  // custom logic
  return "1"
}
onMounted(() => {
  const shopID = findShopID()
  livechatStore.setupBotioLivechat(shopID)
  router.push({ path: "/livechat", query: { platform: "all" } })
})
</script>

<style scoped></style>
