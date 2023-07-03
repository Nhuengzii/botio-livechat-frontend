<template>
    <main class="flex h-[calc(100vh-24px)]">
        <LeftPanel />
        <Chats />

        <!-- start customer view -->
        <div class="flex flex-1 mx-3"></div>
        <!--end customer view -->

    </main>
</template>

<script setup lang="ts">
import LeftPanel from './subs/LeftPanel.vue';
import Chats from './subs/Chats.vue';
import { onMounted } from 'vue';
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
const livechatStore = useLivechatStore()
const uiStore = useUIStore();
onMounted(async () => {
    const availablePages = await livechatStore.getShopInformation()
    for (const page of availablePages.available_pages) {
        livechatStore.pageIDMap.set(page.platform_name, page.page_id)
    }
    const allPageInformation = await livechatStore.getAllPageInformation()
    allPageInformation.statuses.forEach((status => {
        uiStore.addAvailablePlatform(status.platform, { unreadConversations: status.unreadConversations, allConversations: status.allConversations })
    }))
})
</script>

<style scoped></style>
 
