<template>
  <template v-if="isLoading">
    <div>
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
      <ThreadSkeleton />
    </div>
  </template>
  <template v-else>
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
        <div v-for="(conversation, index) in conversations('$route.query.platform as string')"
          key="conversation.conversationID" class="m-2">
          <Thread :conversation="conversation" :index="index" @click="livechatStore.openChat(conversation)"
            mode="normal" />
        </div>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
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
