<template>
  <div>
    <h1>THIS is Root View</h1>
  </div>
</template>

<script setup lang="ts">
import { useShopStore } from '@/stores/shop';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const shopStore = useShopStore()
const router = useRouter()
function findShopID() {
  // custom logic
  return "1"
}
onMounted(() => {
  const shopID = findShopID()
  shopStore.$patch({ shop_id: shopID })
  router.replace({ path: "/livechat", query: { platform: "all" } })
})
</script>

<style scoped></style>
