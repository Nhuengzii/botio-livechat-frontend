<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template >
  <!-- Navbar -->
  <div class="flex flex-[1] w-screen h-screen">
    <Navbar />
    <!--End Navbar-->

    <main class="flex flex-col grow pb-[12px]">
      <RouterView />
    </main>
  </div>
</template>

<style></style>
