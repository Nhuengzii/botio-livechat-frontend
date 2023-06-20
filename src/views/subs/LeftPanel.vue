<template>
  <div class="bg-[#D9D9D94c] w-96">
    <div class="px-5">
      <ShopDisplay />
    </div>
    <PlatformSelector />
    <ThreadsUtils mode="normal" />
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
