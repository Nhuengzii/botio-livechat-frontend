<template>
  <div class="bg-[#D9D9D9]">
    <ShopDisplay />
    <PlatformSelector />
    <ConversationThred />
  </div>
</template>

<script setup lang="ts">
import ConversationThred from './ConversationsThread.vue';
import ShopDisplay from '@/components/ShopDisplay.vue';
import PlatformSelector from '@/components/PlatformSelector.vue';
import ThreadsUtils from '@/components/ThreadsUtils.vue';
</script>

<style scoped></style>
