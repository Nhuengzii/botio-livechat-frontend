<template>
  <div>
    <ThreadSkeleton :num-skeletons="6" v-if="isLoading" />
    <TransitionGroup name="fade" tag="ul">
      <div v-for="(conversation, index) in conversationStore.conversations($route.query.platform as string)"
        :key="conversation.conversationID" v-show="!isLoading">
        <Thread :conversation="conversation" :show-platform="$route.query.platform == 'all'"
          :mode="conversationsThreadMode" />
      </div>
    </TransitionGroup>
    <InfiniteLoading @infinite="loadmore" :firstload="false" :identifier="$route.query.platform as string">
      <template #spinner>
        <ThreadSkeleton :num-skeletons="2" />
      </template>
      <template #complete>
        <div class="p-2"></div>
      </template>
    </InfiniteLoading>

  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThreadSkeleton from '@/components/ThreadSkeleton.vue';
const uiStore = useUIStore();
const conversationStore = useConversationStore()
const { conversationsThreadMode } = storeToRefs(uiStore)
const isLoading = ref(false);
const isFetchingMore = ref(false);
const route = useRoute()
// infinite loading
// 
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import type { Conversation } from '@/types/conversation';
import { useConversationStore } from '@/stores/conversation';

async function loadmore($state: {
  loaded: () => void,
  complete: () => void,
  error: () => void
}) {
  if (isFetchingMore.value) return;
  console.log('load more')
  isFetchingMore.value = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });
  const skip = conversationStore.conversations(route.query.platform as string).length
  isFetchingMore.value = false;
  const olderConversation: Conversation[] = await conversationStore.fetchConversations(route.query.platform as string, skip + 1, 20)
  console.log(olderConversation)
  $state.loaded()
  if (olderConversation.length === 0) {
    console.log('no more conversation')
    $state.complete();
  }
  console.log('load more done')
}


watch(route, async () => {
  isLoading.value = true;
  await conversationStore.fetchConversations(route.query.platform as string, 0, 20)
  isLoading.value = false;
});

onMounted(async () => {
  isLoading.value = true;
  await conversationStore.fetchConversations(route.query.platform as string, 0, 20)
  isLoading.value = false;
});


</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.bg-d9-30 {
  background-color: rgba(217, 217, 217, 0.3);
}


.no-scrollbar::-webkit-scrollbar {
  display: none;
}


.fade-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
