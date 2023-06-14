<template>
  <!-- <button @click="burstConversation">ASSS</button> -->
  <div :class="[(conversationsThreadMode == 'normal' || conversationsThreadMode == 'searching') ?
    'flex-1 max-w-[400px] bg-gray-300' : 'bg-white duration-300 pt-6 w-[100px]']">
    <ThreadUtils :mode="conversationsThreadMode" />
    <div v-if="isLoading" class="flex-1 bg-gray-300 max-w-[400px] max-h-[700px]">
      <div class="flex flex-col items-center justify-center h-full">
        <ThreadSkeleton :num-skeletons="6" />
      </div>
    </div>
    <div v-else v-bind="containerProps" class="flex-1 bg-gray-300 max-w-[400px] max-h-[700px]">
      <div v-bind="wrapperProps">
        <div v-for="({ data }, index) in list" :key="data.conversationID" class="mx-2">
          <Thread :conversation="data" :index="index" @click="livechatStore.openChat(data)"
            :mode="conversationsThreadMode" />
          <hr>
        </div>
      </div>
    </div>

    <!-- <template v-if="conversationsThreadMode == 'searching'"> -->
    <!--   <div class="bg-white max-w-[400px] mx-2 pl-8 py-3 text-[#B2B2B2] text-lg font-bold">แท็ก</div> -->
    <!--   <div class="flex flex-wrap bg-white min-h-[32px] mx-2 pl-6 pr-2 "> -->
    <!--     <div class="flex mx-1 my-2 px-1 bg-[#D9D9D9] rounded " v-for="(tag, index) in ['yay']"> -->
    <!--       <div class=" w-4 h-4 bg-red-500 rounded-full pr-3 mt-2 object-cover"> -->
    <!--       </div> -->
    <!--       <div class="text-sw px-1.5 py-1 truncate max-w-[90px]"> -->
    <!--         {{ tag }} -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </div> -->
    <!--   <div class="bg-white max-w-[400px] mx-2 pl-8 py-3 text-[#B2B2B2] text-lg font-bold">ชื่อการสนทา</div> -->
    <!--   <div class="flex-1 bg-gray-300 max-w-[400px]"> -->
    <!--     <div v-for="(conversation, index) in conversations($route.query.platform as string)" -->
    <!--       key="conversation.conversationID" class="mx-2"> -->
    <!--       <Thread :conversation="conversation" :index="index" @click="livechatStore.openChat(conversation)" -->
    <!--         mode="searching" /> -->
    <!--       <hr> -->
    <!---->
    <!--     </div> -->
    <!--   </div> -->
    <!-- </template> -->
    <!---->
    <!-- <template v-else-if="conversationsThreadMode == 'searching'"> -->
    <!--   <div class="bg-white max-w-[400px] mx-2 pl-2 py-3">แท็ก</div> -->
    <!--   <div class="flex flex-wrap bg-white min-h-[32px] mx-2 pl-3 pr-2 "> -->
    <!--     <div class="flex mx-1 my-2 px-1 bg-[#D9D9D9] rounded " v-for="(tag, index) in ['yay', 'atf']"> -->
    <!--       <div class=" w-4 h-4 bg-red-500 rounded-full pr-3 mt-2 object-cover"> -->
    <!--       </div> -->
    <!--       <div class="text-sw px-1.5 py-1 truncate max-w-[90px]"> -->
    <!--         {{ tag }} -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </div> -->
    <!--   <div class="bg-white max-w-[400px] mx-2 pl-2 py-3">ชื่อการสนทา</div> -->
    <!--   <div class="flex-1 bg-gray-300 max-w-[400px]"> -->
    <!--     <div v-for="(conversation, index) in conversations($route.query.platform as string)" -->
    <!--       key="conversation.conversationID" class="mx-2"> -->
    <!--       <Thread :conversation="conversation" :index="index" @click="livechatStore.openChat(conversation)" -->
    <!--         mode="searching" /> -->
    <!--       <hr> -->
    <!---->
    <!--     </div> -->
    <!--   </div> -->
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
import ThreadUtils from '@/components/ThreadsUtils.vue';
import ThreadSkeleton from '@/components/ThreadSkeleton.vue'
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVirtualList } from '@vueuse/core';
import { computed } from '@vue/reactivity';
const livechatStore = useLivechatStore();
const uiStore = useUIStore();
const { botioLivechat, conversations } = storeToRefs(livechatStore);
const { conversationsThreadMode } = storeToRefs(uiStore)
const isLoading = ref(false);
const route = useRoute()
const conversationsForVirtualList = computed(() => {
  const currentPlatform = route.query.platform as string;
  return conversations.value(currentPlatform)
})
const { list, containerProps, wrapperProps } = useVirtualList(
  conversationsForVirtualList,
  {
    itemHeight: 122.5
  }
)

watch(route, async () => {
  isLoading.value = true;
  await livechatStore.fetchConversations(route.query.platform as string)
  isLoading.value = false;
});

onMounted(async () => {
  isLoading.value = true;
  await livechatStore.fetchConversations(route.query.platform as string)
  isLoading.value = false;
});

function burstConversation() {
  const currentPlatform = route.query.platform as string;
  const conversation = conversations.value(currentPlatform)[0];
  const conversationMap = livechatStore.conversationRaw.get(currentPlatform)!
  for (let i = 0; i < 100; i++) {
    const newConversation = {
      ...conversation
    }
    const randomAvatarUrl = `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/200/300`
    newConversation.participants[0].profilePic.src = randomAvatarUrl;
    newConversation.conversationID = Math.random().toString(36).substring(7);
    conversationMap.set(newConversation.conversationID, newConversation)
  }
}


</script>

<style scoped></style>
