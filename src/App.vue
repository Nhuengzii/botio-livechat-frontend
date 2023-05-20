<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useWebsocketStore } from './stores/websocket';
const websocketStore = useWebsocketStore();
onMounted(() => {
  console.log('App mounted!');
  websocketStore.connect();
});

onUnmounted(() => {
  console.log('App unmounted!');
  websocketStore.disconnect();
});
</script>

<template >
  <!-- Navbar -->
  <div class="flex flex-[1] w-screen h-screen">
    <Navbar />
    <!--End Navbar-->

    <main class="flex flex-col grow pb-[12px]">
      <RouterView :key="$route.params.platform as string" />
    </main>
  </div>
</template>

<style></style>
