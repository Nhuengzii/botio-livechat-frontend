<template >
  <template v-if="mode == 'normal'||mode== 'searching'">
 
    <div class="bg-[#EAEAEA] h-40 mx-2 min-w-[320px] "  >
      <div class="bg-white h-36 my-4">
        <div v-if="mode == 'normal'" class="flex pt-5 ml-5">
            ข้อความทั้งหมด <div class=" px-2  bg-[#D9D9D9] rounded-full ml-3 font-bold text-base">+999</div>
        </div>
      <div class=" flex  justify-around py-[1rem] px-2" :class="query? '':'pl-5 '">
            <div v-if="query"  :class="[query? 'mt-2 ':'']">
                <button type="button" @click="{ query = false; uiStore.conversationsThreadMode='normal'; messageSaersh = '' }"
                    class="text-white   hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center  ml-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H6M12 5l-7 7 7 7" />
                    </svg>
                    <span class="sr-only">Icon description</span>
                </button>
              </div>
              <div class="relative w-full mr-4 duration-500" :class="[query? 'mt-2':'']">
                <div v-if="!query"  class="flex absolute  rounded-full z-10 inset-y-0 left-0 items-center pl-3 pointer-events-none ml-2" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <input type="text" id="voice-search" @click="{ query = true; uiStore.conversationsThreadMode='searching';}" :class="query? '':' rounded-full'" 
                    class="ml-2 bg-[#D9D9D9]  border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :placeholder="query? 'ค้นหา':' ค้นหาจากชื่อ หรือ แท็ก'" v-model="messageSaersh">
                  <button @click="{alert('55555')}" v-if="query"  class="flex absolute  rounded-full z-100 inset-y-0 left-0  items-center pl-3 pointer-events-none ml-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
              </div>
              
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="mode == 'collapse'">
    <h1>Collapse Mode</h1>
  </template>
 
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { useUIStore } from '@/stores/UI';
const uiStore = useUIStore();
 let messageSaersh = ref("");
 const query = ref(false);
defineProps<{
  mode: string
}>()
</script>
 
<style scoped>

</style>
 