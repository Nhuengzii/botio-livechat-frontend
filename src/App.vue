<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useWebsocketStore } from './stores/websocket';
const websocketStore = useWebsocketStore();
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
  <div class="flex flex-[1] w-screen h-screen">
    <Navbar />
    <!--End Navbar-->

    <main class="flex flex-col grow pb-[12px]">
      <RouterView :key="$route.params.platform as string" />
    </main>
  </div>
</template>

<style></style>
