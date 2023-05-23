<template>
    <div class="relative flex flex-col overflow-hidden w-full h-full">
        <div class="relative w-full h-full bg-white overflow-hidden">
            <div class="max-h-[80%] absolute inset-0 top-0 left-0 right-0 overflow-scroll scrollbar-hide pb-[36px]">
                <div class="relative flex flex-col">
                    <div v-for="{ conversationID, conversationPicture, lastActivity, participants } in conversationsStore.conversations"
                        class="flex py-[4px] pr-[4px]">
                        <div class="w-full">
                            <router-link :to="{ name: 'Conver', params: { conversation_id: conversationID } }"
                                class="flex px-[14px] pt-[20px] pb-[1.25rem] ml-[10px] border-2 rounded-[20px]">
                                <div class="grow-1 shrink-0 w-[45px] h-[45px] mr-[20px]">
                                    <div class="overflow-hidden w-[45px] h-[45px] bg-blue-200 rounded-full">
                                        <img v-if="conversationPicture" :src="conversationPicture" alt=""
                                            class="object-cover w-full h-full rounded-full">
                                        <img v-else :src="participants[0].profilePicture" alt=""
                                                    class="object-cover w-full h-full rounded-full">
                                    </div>
                                </div>
                                <div class="grow-2 overflow-hidden">
                                    <div class="flex justify-between">
                                        <span class="text-sm font-semibold leading-6 text-gray-900">{{participants[0].username }}</span>
                                    </div>
                                    <div class="flex items-end justify-between whitespace-nowrap">
                                        <span
                                            class="overflow-hidden text-ellipsis whitespace-nowrap mt-1 truncate text-xs leading-5 text-gray-500">{{lastActivity }}</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

</style>