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
  <div class="flex w-screen h-screen  reset bg-pink-100">
    <Navbar />
    <main class="flex flex-col grow bg-pink-400">
      <RouterView :key="platform"/>
    </main>
  </div>
</template>

<style scoped>
.reset {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
