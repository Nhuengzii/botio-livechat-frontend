<template>
    <div class="flex-[1] bg-green-100 rounded-[18px] mx-[10px]">
        <div class="grid px-[14px]">
            <div class="bg-red-200">
                <h1>This is a platform {{ $route.params.platform }}</h1>
            </div>
            <div class="bg-red-300 pr-[0px] pt-[20px] pr-[14px] pb-[1.25rem]">
                <form action="" class="flex grow-0 shrink-0 basis-[40%]">
                    <input type="text" class="px-[2rem] py-[.7rem]">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div class="bg-red-400">
                fing tag name
            </div>
            <div v-if="$route.params.platform === 'facebook'"
                class="bg-red-500 w-full h-full flex flex-col overflow-hidden">
                <div class="relative overflow-hidden w-full h-full">
                    <div class="max-h-[80%]">
                        <ul>
                            <li v-for="{ conversationID, conversationPicture, lastActivity, updatedAt, participants } in store.conversations"
                                key="ConversationId" class="flex border-b border-gray-300">
                                <div class="flex gap-x-4 w-full">
                                    <router-link to="/fb/1"
                                        class="flex items-center px-[14px] pt-[20px] pb-[1.5rem] cursor-pointer">
                                        <img v-if="conversationPicture"
                                            class="h-12 w-12 flex-none rounded-full bg-gray-50 shrink-0 mr-[20px]"
                                            :src="conversationPicture" alt="">
                                        <img v-else class="h-12 w-12 flex-none rounded-full bg-gray-50 shrink-0 mr-[20px]"
                                            :src="participants[0].profilePicture" alt="">

                                        <div class="min-w-0 flex-auto">
                                            <p class="text-sm font-semibold leading-6 text-gray-900">{{
                                                participants[0].username }}</p>
                                            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lastActivity }}</p>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ChatCenter />
    <ChatRight />
</template>

<script setup lang="ts">

import ChatCenter from '@/components/ChatCenter.vue';
import ChatRight from '@/components/ChatRight.vue';
import { useConversationsStore } from '@/stores/conversations';
const store = useConversationsStore();


</script>
