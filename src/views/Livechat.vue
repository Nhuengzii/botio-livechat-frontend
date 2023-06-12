<template>
  <div>
    <h1>THIS is LiveChat view</h1>
  </div>
  <div>
    <ConversationsThread />
  </div>
  <div>
    <Chats />
  </div>
</template>

<script setup lang="ts">
import ConversationsThread from './subs/ConversationsThread.vue';
import Chats from './subs/Chats.vue';

</script>

<style scoped></style>
