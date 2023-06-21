<template>
  <div class="bg-[#D9D9D94c] min-w-[320px] max-w-[350px]">
    <div class="pl-2">
      <ShopDisplay />
    </div>
    <PlatformSelector class="pl-2"/>
    <ThreadsUtils mode="normal" class="ml-2"/>
    <ConversationThred class="pl-2 no-scrollbar" />
  </div>
</template>

<script setup lang="ts">
import ConversationThred from './ConversationsThread.vue';
import ShopDisplay from '@/components/ShopDisplay.vue';
import PlatformSelector from '@/components/PlatformSelector.vue';
import ThreadsUtils from '@/components/ThreadsUtils.vue';
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>
