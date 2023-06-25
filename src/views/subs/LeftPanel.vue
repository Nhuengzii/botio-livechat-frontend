<template>
  <div class="flex-[1] flex flex-col justify-between bg-[#FFD95A]  min-w-[320px] max-w-[350px] ml-1 rounded-[10px]">
    <div>
      <template v-if="conversationsThreadMode == 'normal'">
        <div class="px-2">
          <ShopDisplay />
        </div>
        <div class="pt-4 mx-2">
          <PlatformSelector />
        </div>
        <ThreadsUtils mode="normal" class="mx-2" :platform="$route.query.platform as string" />
        <div class="h-[calc(100vh-370px)] overflow-y-auto no-scrollbar">
          <ConversationThred class="px-2 no-scrollbar" />
        </div>
      </template>
      <template v-else>
        <div>
          <ThreadsUtils mode="searching" :platform="$route.query.platform as string" />
        </div>
      </template>
    </div>
    <div v-if="conversationsThreadMode == 'normal'"
      class="flex w-full items-center  justify-center bg-[#6d613a] h-[370px] rounded-b-[10px] text-[#FFD95A] text-[16px]">
      Botio X CPE
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationThred from './ConversationsThread.vue';
import ShopDisplay from '@/components/ShopDisplay.vue';
import PlatformSelector from '@/components/PlatformSelector.vue';
import ThreadsUtils from '@/components/ThreadsUtils.vue';
import { useUIStore } from '@/stores/UI';
import { storeToRefs } from 'pinia';
const uiStore = useUIStore();
const { conversationsThreadMode } = storeToRefs(uiStore)
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
