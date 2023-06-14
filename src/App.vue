<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template >
  <div class="flex w-screen h-screen">
    <aside class="flex-row">
      <Navbar />
    </aside>
    <main class="flex flex-col grow">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
