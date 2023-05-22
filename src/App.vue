<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useWebsocketStore } from './stores/websocket';
const websocketStore = useWebsocketStore();
import { useRoute } from 'vue-router';
const route = useRoute();
const platform = route.params.platform as string
onMounted(() => {
  console.log('App mounted!');
  const disableAutoConnect = import.meta.env.VITE_DISABLE_WEBSOCKET_AUTO_CONNECT;
  if (disableAutoConnect === undefined) {
    console.log('VITE_DISABLE_WEBSOCKET_AUTO_CONNECT is undefined')
  }
  websocketStore.disableAutoConnect = disableAutoConnect == "true";
  websocketStore.connect();
});

onUnmounted(() => {
  console.log('App unmounted!');
  websocketStore.disconnect();
});
</script>

<template >
  <!-- Navbar -->
  <div class="flex flex-[1] grow-0 shrink-0 w-screen h-screen">
    <Navbar />
    <main class="flex flex-col grow pb-[12px]">
      <RouterView :key="platform"/>
    </main>
  </div>
</template>

<style></style>
