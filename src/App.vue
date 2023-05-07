<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template >
  <!-- Navbar -->
  <div class="flex flex-[1] w-screen h-screen">
    <aside class="flex">
      <div class="w-72 bg-green-300"></div>
    </aside>
    <!--End Navbar-->

    <main class="flex flex-col grow pb-[12px]">
      <RouterView />
    </main>
  </div>
</template>

<style></style>
