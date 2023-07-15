<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template >
  <div class="flex w-screen h-screen">
    <main class="flex flex-col grow mt-2">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
