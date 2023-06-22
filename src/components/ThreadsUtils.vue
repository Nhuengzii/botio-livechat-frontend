<template >
  <template v-if="mode == 'normal'" class="duration-300">
    <div class="bg-white rounded-t-3xl py-5 px-5">
      <div class="flex">
        <h1 class="text-slate-800">ข้อความทั้งหมด</h1>
        <h1 class="ml-5 bg-[#F94A2999] rounded-full px-2 font-semibold text-[#394867]"> 999+ </h1>
      </div>
      <div class="relative w-full mr-4 mt-4">
          <div class="absolute inset-y-0  left-0 flex items-center pl-4 pointer-events-none"
            :class="[querying ? '' : 'z-50']">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </div>
          <input type="text" :class="querying ? '' : ' rounded-full z-0'"
            class="bg-[#D9D9D9]  border border-gray-300 text-gray-900  outline-none   block w-full pl-9 p-1  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="querying ? 'ค้นหา' : ' ค้นหาจากชื่อ หรือ แท็ก'" v-model="query"
            @click="() => { uiStore.conversationsThreadMode = 'searching' }">
      </div>
    </div>
  </template>
  <template v-else-if="mode == 'searching'" class="duration-300">
     <div class="bg-white  mx-2 mt-2">
      <div class="flex items-center">
        <div class="pl-8 pt-5" @click="() => { uiStore.conversationsThreadMode = 'normal' } ">
          <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
        </div>
        <div class="flex items-center w-full pr-4 pl-2 mr-1 mt-5">
          <input type="text"
          class="ml-2 bg-[#D9D9D9]  border border-gray-300 text-gray-900  outline-none   block w-full pl-2 p-1   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ค้นหา" v-model="query">
          <div class="ml-2"  @click="() => {query=  ''} "
 
            :class="[querying ? '' : 'z-50']">
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
          </div>
        </div>
      </div>
      <div class="flex   px-4 py-2">
         <button class="mr-5" @click="() => { searchMode = 'by-message'}">แชทข้อความ</button>
        <button @click="() => { searchMode = 'by-name' }">ชื่อสนทนา</button>
        
      </div>
      <div class=" bg-[#27374D] duration-300 h-1.5 w-[80px]" :class="searchMode == 'by-message' ? 'ml-[15px]' : 'ml-[100px]'"></div>

      <div v-for="conversation in searchResult" :key="conversation.conversationID">
        <Thread :conversation="conversation" :show-platform="true" mode="searching" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUIStore } from '@/stores/UI';
import { useLivechatStore } from '@/stores/livechat';
import { useRoute } from 'vue-router';
import Thread from './Thread.vue';
import type { Conversation } from '@/types/conversation';
const uiStore = useUIStore();
const livechatStore = useLivechatStore()
const searchResult = ref([] as Conversation[])
const searchMode = ref('by-name')
const query = ref("");
const route = useRoute()
defineProps<{
  mode: string
}>()
const querying = ref(false)

watch(query, (value) => {
  if (value.length > 0) {
    if (searchMode.value === 'by-name') {
      livechatStore.searchConversationByName('facebook', query.value).then((result) => {
        searchResult.value = result
      })
    } else if (searchMode.value === 'by-message') {
      livechatStore.searchConversationByMessage('facebook', query.value).then((result) => {
        searchResult.value = result
      })
    }
  } else {
    querying.value = false
  }
})

</script>
 
<style scoped></style>
 
 
