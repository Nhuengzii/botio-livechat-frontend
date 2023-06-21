<template>
  <div v-bind="containerProps" class="bg-red-500">
    <div v-bind="wrapperProps"  >
      <div v-for="({ data }, index) in list" :key="data.conversationID">
        
        <Thread :conversation="data" 
          :show-platform="$route.query.platform == 'centralized'"
          :mode="conversationsThreadMode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import Thread from '@/components/Thread.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVirtualList } from '@vueuse/core';
import { computed } from '@vue/reactivity';
const livechatStore = useLivechatStore();
const uiStore = useUIStore();
const { conversations } = storeToRefs(livechatStore);
const { conversationsThreadMode } = storeToRefs(uiStore)
const isLoading = ref(false);
const route = useRoute()
const conversationsForVirtualList = computed(() => {
  const currentPlatform = route.query.platform as string;
  return conversations.value(currentPlatform, conversationsThreadMode.value === 'searching')
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
</style>
