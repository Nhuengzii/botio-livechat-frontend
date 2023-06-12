<template>
  <header class="pt-2 pb-3 px-3">
    <h1>THIS is LiveChat view</h1>
  </header>
  <main class="flex h-[calc(100vh-48px)] bg-green-100">
    <ConversationsThread />
    <Chats />
  </main>
  
</template>

<script setup lang="ts">
import ConversationsThread from './subs/ConversationsThread.vue';
import Chats from './subs/Chats.vue';

</script>

<style scoped></style>
