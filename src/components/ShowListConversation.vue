<template>
    <!--- conversation list-->

    <div v-for="{ conversationID, conversationPicture, lastActivity, participants } in conversationsStore.conversations"
        class="h-[80px] flex-col px-4 justify-center bg-green-400 mb-1 border-neutral-600 w-full overflow-clip">
            <router-link :to="{ name: 'Conver', params: { conversation_id: conversationID } }"
                class="flex px-[14px] pt-[20px] pb-[1.25rem] ">
                <div class="grow-1 shrink-0 w-[45px] h-[45px] mr-[20px]">
                    <div class="overflow-hidden w-[45px] h-[45px] bg-blue-200 ">
                        <img v-if="conversationPicture" :src="conversationPicture" alt=""
                            class="object-cover w-full h-full rounded-full">
                        <img v-else :src="participants[0].profilePicture" alt=""
                            class="object-cover w-full h-full rounded-full">
                    </div>
                </div>
                <div class="grow-2 overflow-hidden">
                    <div class="flex justify-between">
                        <span class="text-sm font-semibold leading-6 text-gray-900">{{
                            participants[0].username }}</span>
                    </div>
                    <div class="flex items-end justify-between whitespace-nowrap">
                        <span
                            class="text-ellipsis whitespace-nowrap mt-1 truncate text-xs leading-5 text-gray-500">{{
                                lastActivity }}</span>
                    </div>
                </div>
            </router-link>
        </div>

    <!--- end conversation list-->
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
const conversationsStore = useConversationsStore();
const route = useRoute();
onBeforeMount(async () => {
    await conversationsStore.fetchConversations(route.params.platform as string);
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>