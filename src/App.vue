<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template >
  <div>
    <Navbar />
  </div>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
