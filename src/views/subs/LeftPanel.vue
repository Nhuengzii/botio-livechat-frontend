<template>
  <div class="bg-[#D9D9D94c] h-full min-w-[320px] max-w-[350px] ">
    <div class="px-2">
      <ShopDisplay />
    </div>
    <PlatformSelector class="px-2"/>
    <ThreadsUtils mode="normal" class="mx-2"/>
    <ConversationThred class="px-2 no-scrollbar " />
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
