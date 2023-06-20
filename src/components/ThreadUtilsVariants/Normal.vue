<template>
  <div class="bg-white rounded-t-3xl py-5 px-5">
    <div class="flex">
      <h1 class="text-slate-800">ข้อความทั้งหมด</h1>
      <h1 class="ml-5 bg-[#F94A2999] rounded-xl"> 999+ </h1>
    </div>
    <div class="my-5">
      <input type="text" :class="querying ? '' : ' rounded-full'"
        class="ml-2 bg-[#D9D9D9]  border border-gray-300 text-gray-900  outline-none   block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="querying ? 'ค้นหา' : ' ค้นหาจากชื่อ หรือ แท็ก'" v-model="query">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
import { ref } from 'vue';
const query = ref('')
const querying = ref(false)
const uiStore = useUIStore()
</script>

<style scoped></style>
