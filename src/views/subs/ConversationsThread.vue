<template>
  <div class="flex-1 bg-gray-300 max-w-[400px]">
    <ThreadUtils :mode="conversationsThreadMode" />
    <template v-if="conversationsThreadMode == 'normal'">
      <div class="flex-1 bg-gray-300 max-w-[400px]">
        <div v-for="(conversation, index) in conversations($route.query.platform as string)"
          key="conversation.conversationID" class="mx-2">
          <Thread :conversation="conversation" :index="index" @click="livechatStore.openChat(conversation)"
            mode="normal" />
          <hr>

        </div>
      </div>
    </template>
    <template v-else-if="conversationsThreadMode == 'collapse'">
      <div>
        <div v-for="(conversation, index) in conversations($route.query.platform as string)"
          key="conversation.conversationID" class="m-2">
          <Thread :conversation="conversation" :index="index" @click="livechatStore.openChat(conversation)"
            mode="collapse" />
        </div>
      </div>
    </template>

    <template v-else-if="conversationsThreadMode == 'searching'">
      <!--TAG -->
      <div class="bg-white max-w-[400px] mx-2 pl-2 py-3">แท็ก</div>
      <div class="flex flex-wrap bg-white min-h-[32px] mx-2 pl-3 pr-2 ">
        <div class="flex mx-1 my-2 px-1 bg-[#D9D9D9] rounded " v-for="(tag, index) in ['yay', 'atf']">
          <div class=" w-4 h-4 bg-red-500 rounded-full pr-3 mt-2 object-cover">
          </div>
          <div class="text-sw px-1.5 py-1 truncate max-w-[90px]">
            {{ tag }}
          </div>
        </div>
      </div>
      <!--End TAG-->
      <!--User-->
      <div class="bg-white max-w-[400px] mx-2 pl-2 py-3">ชื่อการสนทา</div>
      <div class="flex-1 bg-gray-300 max-w-[400px]">
        <div v-for="(conversation, index) in conversations($route.query.platform as string)"
          key="conversation.conversationID" class="mx-2">
          <Thread :conversation="conversation" :index="index" @click="livechatStore.openChat(conversation)"
            mode="searching" />
          <hr>

        </div>
      </div>
      <!--End User-->
    </template>
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
const livechatStore = useLivechatStore();
const uiStore = useUIStore();
const { botioLivechat, conversations } = storeToRefs(livechatStore);
const { conversationsThreadMode } = storeToRefs(uiStore)
const isLoading = ref(false);
const route = useRoute()
//conversationsThreadMode.value = 'collapse';

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


</script>

<style scoped></style>
