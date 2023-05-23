<template>
    <aside class="flex-row justify-center w-[25%] h-[100%] bg-green-400 rounded-[18px] p-1 duration-500 border-solid border-glass relative  mt-2  shadow-inner">
        <div v-if="$route.params.platform === 'facebook'" class="w-full h-full">
            <div class="grid grid-cols-1 px-[14px] pb-[1.25rem] pt-[20px] w-full">
                <div class="flex gap-3 items-center   rounded-2xl ml-3">
                    <div>ข้อความทั้งหมด
                        <span class=" bg-blue-400 rounded-full items-center justify-center pl-3 pr-3 pt-1 pb-1">{{
                            conversationsStore.conversations.length
                        }} </span>
                    </div>

                </div>
            </div>
            <!-- end num message box-->
            <div class=" flex bg-blue-100 justify-around py-[1rem]">
                <button class="flex bg-blue-200 w-[85%] h-full items-center justify-start py-[.75rem] rounded-[20px]">
                    <div class="pl-[20px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>

                    <span class="pl-[20px] text-base leading-6 text-gray-900">ค้นหาจากชื่อ</span>

                </button>
            </div>
            <!-- end search name box-->

            <!--- conversation list-->
            <div class="relative flex flex-col overflow-hidden w-full h-full ">
                <div class="relative w-full h-full bg-white overflow-hidden">
                    <div class="max-h-[80%] absolute inset-0 top-0 left-0 right-0 overflow-scroll scrollbar-hide pb-[36px]">
                        <div class="relative flex flex-col">
                            <div v-for="{ conversationID, conversationPicture, lastActivity, participants } in conversationsStore.conversations"
                                class="flex py-[4px] pr-[4px]">
                                <div class="w-full ">
                                    <router-link :to="{ name: 'Conver', params: { conversation_id: conversationID } }"
                                        class="flex px-[14px] pt-[20px] pb-[1.25rem]  border-2 rounded-[20px]">
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
                                                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                                                    participants[0].username }}</span>
                                            </div>
                                            <div class="flex items-end justify-between whitespace-nowrap">
                                                <span
                                                    class="overflow-hidden text-ellipsis whitespace-nowrap mt-1 truncate text-xs leading-5 text-gray-500">{{
                                                        lastActivity }}</span>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--- end conversation list-->


        </div>
    </aside>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import type { Text } from 'vue';
const props = defineProps(['numConversation'])
const conversationsStore = useConversationsStore();
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