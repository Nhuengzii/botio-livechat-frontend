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
      <div class="flex">
        <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
        <input type="text" :class="querying ? '' : ' rounded-full z-0'"
          class="ml-2 bg-[#D9D9D9]  border border-gray-300 text-gray-900  outline-none   block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :placeholder="querying ? 'ค้นหา' : ' ค้นหาจากชื่อ หรือ แท็ก'" v-model="query">
        <div @click="() => { uiStore.conversationsThreadMode = 'normal' }">
          <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
        </div>
      </div>
      <div class="flex justify-between">
        <h1>ทั้งหมด</h1>
        <h1>แชทข้อความ</h1>
        <h1>ชื่อสนทนา</h1>
      </div>
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
const query = ref("");
const route = useRoute()
defineProps<{
  mode: string
}>()
const querying = ref(false)

watch(query, (value) => {
  if (value.length > 0) {
    querying.value = true
    livechatStore.searchConversationByName('facebook', query.value).then((result) => {
      searchResult.value = result
    })
  } else {
    querying.value = false
  }
})

</script>
 
<style scoped></style>
 
 
