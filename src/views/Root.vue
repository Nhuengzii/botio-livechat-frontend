<template>
  <div>
    <h1>THIS is Root View</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

function findShopID() {
  // custom logic
  return "1"
}
onMounted(() => {
  const shopID = findShopID()
})
</script>

<style scoped></style>
