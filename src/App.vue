<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUIStore } from './stores/UI';
const uiStore = useUIStore()
window.onfocus = () => {
  window.document.title = "botio"
  uiStore.is_window_focus = true
}
window.onblur = () => {
  uiStore.is_window_focus = false
}
</script>

<template >
  <div class="flex w-screen h-screen">
    <main class="flex flex-col grow mt-2">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
