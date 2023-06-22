<template> 
    <div class="flex flex-col justify-between bg-[#D9D9D94c]  min-w-[320px] max-w-[350px]">
      <div>
        <template v-if="conversationsThreadMode == 'normal'">
          <div class="px-2">
            <ShopDisplay />
          </div>        
               <PlatformSelector class="pt-4  mx-2" />
 
              <ThreadsUtils mode="normal" class="mx-2" />
              <ConversationThred class="px-2 no-scrollbar" />
        </template>
        <template v-else>
          <div>
            <ThreadsUtils mode="searching" />
          </div>
        </template>
      </div>
      <div class="flex w-full p-5 bg-slate-700 justify-center text-[#FFD95A] text-[16px]">
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
