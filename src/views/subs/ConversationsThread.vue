<template>
  <div  
  :class="[(conversationsThreadMode == 'normal'||conversationsThreadMode == 'searching')? 
  'flex-1 max-w-[400px] bg-gray-300':'bg-white duration-300 pt-6 w-[100px]']">
  <ThreadUtils :mode="conversationsThreadMode" />
  <template v-if="conversationsThreadMode == 'normal'">
    <div class="flex-1 bg-gray-300 max-w-[400px]">
      <div v-for="(conversation, index) in conversations($route.query.platform as string)"
        key="conversation.conversationID" class="mx-2">
        <Thread :conversation="conversation" :index="index"
          @click="openChat($route.query.platform as string, 
          conversation.conversationID)" mode="normal" />
        <hr>
      </div>
    </div>
  </template>
  <template v-else-if="conversationsThreadMode == 'collapse'">
    <div class="bg-white ">
      <div v-for="(conversation, index) in conversations($route.query.platform as string)"
        key="conversation.conversationID" class="ml-3.5 my-2">
          <Thread :conversation="conversation" :index="index"
          @click="openChat($route.query.platform as string, conversation.conversationID)" mode="collapse" />
       </div>
    </div>
  </template>

  <template v-else-if="conversationsThreadMode == 'searching'">
    <!--TAG -->
       <div class="bg-white max-w-[400px] mx-2 pl-8 py-3 text-[#B2B2B2] text-lg font-bold">แท็ก</div> 
      <div class="flex flex-wrap bg-white min-h-[32px] mx-2 pl-6 pr-2 ">
        <div class="flex mx-1 my-2 px-1 bg-[#D9D9D9] rounded " v-for="(tag, index) in visibleTagLists">
          <div class=" w-4 h-4 bg-red-500 rounded-full pr-3 mt-2 object-cover" >
          </div>
          <div class="text-sw px-1.5 py-1 truncate max-w-[90px]">
              {{ tag }}
          </div>  
        </div>
      </div>
    <!--End TAG-->
    <!--User-->
    <div class="bg-white max-w-[400px] mx-2 pl-8 py-3 text-[#B2B2B2] text-lg font-bold">ชื่อการสนทา</div> 
    <div class="flex-1 bg-gray-300 max-w-[400px]">
      <div v-for="(conversation, index) in conversations($route.query.platform as string)"
        key="conversation.conversationID" class="mx-2">
        <Thread :conversation="conversation" :index="index"
          @click="openChat($route.query.platform as string, conversation.conversationID)" mode="searching" />
        <hr>
 
      </div>
    </div>
    <!--End User-->
  </template>
  </div>
</template>

<script setup lang="ts">
import{ref} from 'vue'
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
import ThreadUtils from '@/components/ThreadsUtils.vue';
import { storeToRefs } from 'pinia';
const livechatStore = useLivechatStore();
const uiStore = useUIStore();
const { conversations } = storeToRefs(livechatStore);
const { conversationsThreadMode } = storeToRefs(uiStore)
const visibleTagLists = [
  "tagnamesefffsfaawdwdwdad", "t", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname"
]
const Colorpoin = ref('red')
//conversationsThreadMode.value = 'searching'
async function openChat(platform: string, conversationID: string) {
  await livechatStore.openChat(platform, conversationID);
}


</script>

<style scoped>

</style>
