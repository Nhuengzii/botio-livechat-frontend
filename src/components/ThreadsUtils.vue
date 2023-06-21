<template >
  <template v-if="mode == 'normal'">
    <div class="bg-white rounded-t-3xl py-5 px-5">
      <div class="flex">
        <h1 class="text-slate-800">ข้อความทั้งหมด</h1>
        <h1 class="ml-5 bg-[#F94A2999] rounded-xl"> 999+ </h1>
      </div>
      <div class="relative w-full mr-4 ">
        <div class="absolute inset-y-0  left-0 flex items-center pl-6 pointer-events-none"
          :class="[querying ? '' : 'z-50']">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </div>
        <input type="text" :class="querying ? '' : ' rounded-full z-0'"
          class="ml-2 bg-[#D9D9D9]  border border-gray-300 text-gray-900  outline-none   block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :placeholder="querying ? 'ค้นหา' : ' ค้นหาจากชื่อ หรือ แท็ก'" v-model="query"
          @click="() => { uiStore.conversationsThreadMode = 'searching' }">
      </div>
    </div>
  </template>
  <template v-else-if="mode == 'searching'">
    <div>
      <h1>YEYEYEYE</h1>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUIStore } from '@/stores/UI';
import { useLivechatStore } from '@/stores/livechat';
import { useRoute } from 'vue-router';
const uiStore = useUIStore();
const livechatStore = useLivechatStore()
const query = ref("");
const route = useRoute()
defineProps<{
  mode: string
}>()
const querying = ref(false)

</script>
 
<style scoped></style>
 
 
