<template>
  <div class="bg-white px-3 py-3 hover:bg-[#eeeeee]"
    @click="() => { livechatStore.openChat(conversation.platform, conversation.conversationID); conversation.unRead = 0; }">
    <ThreadNormal v-if="mode === 'normal'" :conversation="conversation" :show-platform="false"
      :update-time-status="updateTimeStatus" />
  </div>
  <hr />
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import UserTag from '@/components/UserTag.vue'
import ThreadNormal from '@/components/ThreadVariants/ThreadNormal.vue'
import { useLivechatStore } from '@/stores/livechat';

const { conversation, mode } = defineProps<{
  conversation: Conversation
  mode: string
  showPlatform: boolean
}>()

const livechatStore = useLivechatStore()
livechatStore.markAsReadEventBus.on((readedConversationID) => {
  if (conversation.conversationID === readedConversationID) {
    conversation.unRead = 0;
  }
})

const updateTimeStatus = ref('')
let _timer: number | null = null;

onMounted(() => {
  updateTimeStatus.value = getLastActivity(conversation.updatedTime)
  _timer = setInterval(() => {
    updateTimeStatus.value = getLastActivity(conversation.updatedTime)
  }, 10000)
})

onUpdated(() => {
  updateTimeStatus.value = getLastActivity(conversation.updatedTime)
})

onUnmounted(() => {
  if (_timer) {
    clearInterval(_timer)
  }
})



const getLastActivity = (timestamp: number) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `เมื่อ ${days} วันที่แล้ว`;
  } else if (hours > 0) {
    return `เมื่อ ${hours} ชั่วโมงที่แล้ว`;
  } else if (minutes > 0) {
    return `เมื่อ ${minutes} นาทีที่แล้ว`;
  } else {
    return `เมื่อไม่กี่วินาทีที่แล้ว`;
  }
};

</script>

<style scoped></style>
  <!-- <div class="flex py-4 px-3" :class="[(mode === 'normal' || mode === 'searching') ? 'bg-white min-w-[320px]' : '']"> -->
  <!--   <template v-if="mode === 'normal'"> -->
  <!--     <div class="w-24 "> -->
  <!--       <div class="static"> -->
  <!--         <img :src=conversation.participants[0].profilePic.src class="h-16 w-16 rounded-full object-cover	"> -->
  <!--         <div class="absolute bottom-6 left-11  bg-[#EAEAEA] rounded-full" v-if="showPlatform"> -->
  <!--           <svg v-if="conversation.platform == 'facebook'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 m-1 " -->
  <!--             style="color:   #2F58CD;" fill="currentColor" viewBox="0 0 512 512"> -->
  <!--             <path -->
  <!--               d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /> -->
  <!--           </svg> -->
  <!--           <svg v-else-if="conversation.platform == 'line'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 m-1 " -->
  <!--             style="color:   #38E54D;" fill="currentColor" viewBox="0 0 512 512"> -->
  <!--             <path -->
  <!--               d="M311 196.8v81.3c0 2.1-1.6 3.7-3.7 3.7h-13c-1.3 0-2.4-.7-3-1.5l-37.3-50.3v48.2c0 2.1-1.6 3.7-3.7 3.7h-13c-2.1 0-3.7-1.6-3.7-3.7V196.9c0-2.1 1.6-3.7 3.7-3.7h12.9c1.1 0 2.4 .6 3 1.6l37.3 50.3V196.9c0-2.1 1.6-3.7 3.7-3.7h13c2.1-.1 3.8 1.6 3.8 3.5zm-93.7-3.7h-13c-2.1 0-3.7 1.6-3.7 3.7v81.3c0 2.1 1.6 3.7 3.7 3.7h13c2.1 0 3.7-1.6 3.7-3.7V196.8c0-1.9-1.6-3.7-3.7-3.7zm-31.4 68.1H150.3V196.8c0-2.1-1.6-3.7-3.7-3.7h-13c-2.1 0-3.7 1.6-3.7 3.7v81.3c0 1 .3 1.8 1 2.5c.7 .6 1.5 1 2.5 1h52.2c2.1 0 3.7-1.6 3.7-3.7v-13c0-1.9-1.6-3.7-3.5-3.7zm193.7-68.1H327.3c-1.9 0-3.7 1.6-3.7 3.7v81.3c0 1.9 1.6 3.7 3.7 3.7h52.2c2.1 0 3.7-1.6 3.7-3.7V265c0-2.1-1.6-3.7-3.7-3.7H344V247.7h35.5c2.1 0 3.7-1.6 3.7-3.7V230.9c0-2.1-1.6-3.7-3.7-3.7H344V213.5h35.5c2.1 0 3.7-1.6 3.7-3.7v-13c-.1-1.9-1.7-3.7-3.7-3.7zM512 93.4V419.4c-.1 51.2-42.1 92.7-93.4 92.6H92.6C41.4 511.9-.1 469.8 0 418.6V92.6C.1 41.4 42.2-.1 93.4 0H419.4c51.2 .1 92.7 42.1 92.6 93.4zM441.6 233.5c0-83.4-83.7-151.3-186.4-151.3s-186.4 67.9-186.4 151.3c0 74.7 66.3 137.4 155.9 149.3c21.8 4.7 19.3 12.7 14.4 42.1c-.8 4.7-3.8 18.4 16.1 10.1s107.3-63.2 146.5-108.2c27-29.7 39.9-59.8 39.9-93.1z" /> -->
  <!--           </svg> -->
  <!--         </div> -->
  <!--       </div> -->
  <!--     </div> -->
  <!--     <div class="ml-3 overflow-hidden w-full "> -->
  <!--       <p class=" font-bold  truncate ml-3 text-base" :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'"> -->
  <!--         {{ conversation.participants[0].username }}</p> -->
  <!--       <div class="flex justify-between mt-1 mb-2"> -->
  <!--         <div class="truncate ml-3 max-w-[100px] " :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'">{{ -->
  <!--           conversation.lastActivity }}</div> -->
  <!--         <div class="truncate pr-3 text-sm  " :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'">{{ -->
  <!--           updateTimeStatus }}</div> -->
  <!--       </div> -->
  <!--       <UserTag /> -->
  <!--     </div> -->
  <!--   </template> -->
  <!--   <template v-else-if="mode === 'collapse'"> -->
  <!--     <div> -->
  <!--       <div class="static"> -->
  <!--         <div class="h-14"><img :src=conversation.participants[0].profilePic.src -->
  <!--             class="h-14 w-14 rounded-full object-cover	"> -->
  <!--         </div> -->
  <!--         <div class="absolute bottom-[-3px] left-[40px]  bg-[#EAEAEA] rounded-full" v-if="showPlatform"> -->
  <!--           <svg v-if="conversation.platform == 'facebook'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 m-1 " -->
  <!--             style="color:   #2F58CD;" fill="currentColor" viewBox="0 0 512 512"> -->
  <!--             <path -->
  <!--               d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /> -->
  <!--           </svg> -->
  <!--           <svg v-else-if="conversation.platform == 'line'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 m-1 " -->
  <!--             style="color:   #38E54D;" fill="currentColor" viewBox="0 0 512 512"> -->
  <!--             <path -->
  <!--               d="M311 196.8v81.3c0 2.1-1.6 3.7-3.7 3.7h-13c-1.3 0-2.4-.7-3-1.5l-37.3-50.3v48.2c0 2.1-1.6 3.7-3.7 3.7h-13c-2.1 0-3.7-1.6-3.7-3.7V196.9c0-2.1 1.6-3.7 3.7-3.7h12.9c1.1 0 2.4 .6 3 1.6l37.3 50.3V196.9c0-2.1 1.6-3.7 3.7-3.7h13c2.1-.1 3.8 1.6 3.8 3.5zm-93.7-3.7h-13c-2.1 0-3.7 1.6-3.7 3.7v81.3c0 2.1 1.6 3.7 3.7 3.7h13c2.1 0 3.7-1.6 3.7-3.7V196.8c0-1.9-1.6-3.7-3.7-3.7zm-31.4 68.1H150.3V196.8c0-2.1-1.6-3.7-3.7-3.7h-13c-2.1 0-3.7 1.6-3.7 3.7v81.3c0 1 .3 1.8 1 2.5c.7 .6 1.5 1 2.5 1h52.2c2.1 0 3.7-1.6 3.7-3.7v-13c0-1.9-1.6-3.7-3.5-3.7zm193.7-68.1H327.3c-1.9 0-3.7 1.6-3.7 3.7v81.3c0 1.9 1.6 3.7 3.7 3.7h52.2c2.1 0 3.7-1.6 3.7-3.7V265c0-2.1-1.6-3.7-3.7-3.7H344V247.7h35.5c2.1 0 3.7-1.6 3.7-3.7V230.9c0-2.1-1.6-3.7-3.7-3.7H344V213.5h35.5c2.1 0 3.7-1.6 3.7-3.7v-13c-.1-1.9-1.7-3.7-3.7-3.7zM512 93.4V419.4c-.1 51.2-42.1 92.7-93.4 92.6H92.6C41.4 511.9-.1 469.8 0 418.6V92.6C.1 41.4 42.2-.1 93.4 0H419.4c51.2 .1 92.7 42.1 92.6 93.4zM441.6 233.5c0-83.4-83.7-151.3-186.4-151.3s-186.4 67.9-186.4 151.3c0 74.7 66.3 137.4 155.9 149.3c21.8 4.7 19.3 12.7 14.4 42.1c-.8 4.7-3.8 18.4 16.1 10.1s107.3-63.2 146.5-108.2c27-29.7 39.9-59.8 39.9-93.1z" /> -->
  <!--           </svg> -->
  <!--         </div> -->
  <!--       </div> -->
  <!--     </div> -->
  <!--   </template> -->
  <!--   <template v-else-if="mode === 'searching'"> -->
  <!--     <img :src=conversation.participants[0].profilePic.src class="h-16 w-16 rounded-full object-cover	"> -->
  <!--     <div class="ml-3 overflow-hidden w-full "> -->
  <!--       <p class=" font-bold  truncate ml-3 text-base" :class="conversation.isRead ? 'text-[#B2B2B2]' : 'text-slate-900'"> -->
  <!--         {{ conversation.participants[0].username }}</p> -->
  <!--       <div v-if="true" class="flex justify-between mt-1 mb-2"> -->
  <!--       </div> -->
  <!--       <UserTag /> -->
  <!--     </div> -->
  <!--   </template> -->
  <!-- </div> -->

