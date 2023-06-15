<template >
  <template v-if="mode == 'normal' || mode == 'searching'">
    <div class="mx-6 bg-[#EAEAEA] min-w-[320px] duration-500" :class="[query ? 'h-32' : 'h-40']">
      <div class="bg-white h-36 my-4">
        <div v-if="mode == 'normal'" class="flex pt-5 mx-8 justify-between">
          <div class="flex">ข้อความทั้งหมด <div class=" px-2  bg-[#D9D9D9] rounded-full ml-3 font-bold text-base">999+
            </div>
          </div>
          <div class="flex ">
            <button @click="uiStore.conversationsThreadMode = 'collapse'">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class=" flex  justify-around py-[1rem] px-2" :class="query ? '' : 'pl-5 '">
          <div v-if="query" :class="[query ? 'mt-1.5 ' : '']">
            <button type="button"
              @click="{ query = false; uiStore.conversationsThreadMode = 'normal'; messageSaersh = '' }"
              class="text-white   hover:bg-gray-100  p-2 rounded-full inline-flex items-center  ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 448 512">
                <path
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
          <div class="relative w-full mr-4 duration-500" :class="[query ? 'mt-2' : 'mt-2']">
            <div v-if="!query"
              class="flex absolute  rounded-full z-10 inset-y-0 left-0 items-center pl-3 pointer-events-none ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input type="text" @click="{ query = true; uiStore.conversationsThreadMode = 'searching'; }"
              :class="query ? '' : ' rounded-full'"
              class="ml-2 bg-[#D9D9D9]  border border-gray-300 text-gray-900  outline-none   block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="query ? 'ค้นหา' : ' ค้นหาจากชื่อ หรือ แท็ก'" v-model="messageSaersh">

          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="mode == 'collapse'">
    <div>
      <div>
        <button @click="uiStore.conversationsThreadMode = 'normal'" class="p-5 ml-6 mb-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512">
            <path
              d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </button>
      </div>
      <div>
        <button @click="uiStore.conversationsThreadMode = 'searching'" class="p-4 ml-6 mb-3 bg-gray-300 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
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
let messageSaersh = ref("");
const query = ref(false);
const route = useRoute()
defineProps<{
  mode: string
}>()

watch(messageSaersh, (value) => {
  console.log(value)
  const currentPlatform = route.query.platform as string
  livechatStore.searchConversations(currentPlatform, value).then((res) => {
    console.log(`searching of platform ${currentPlatform} is done with result ${res.length}`)
  })
})

</script>
 
<style scoped></style>
 
 
