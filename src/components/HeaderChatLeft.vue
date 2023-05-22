<template>
    <div class="grid grid-cols-2 px-[14px] pb-[1.25rem] pt-[20px]">
        <div class="bg-red-100 flex items-center justify-center py-[1rem]">
            <p class="text-base">ข้อความทั้งหมด</p>
            <div class=" flex w-[25px] h-[25px] bg-blue-400 rounded-full items-center justify-center ml-[10px]">
                        <span class="text-white">{{ conversationsStore.conversations.length }}</span>
                    </div>
                </div>
                <div class="bg-red-200 justify-end"></div>
            </div>
            <!-- end num message box-->

            <!-- search name box-->
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
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
const props = defineProps(['numConversation'])
const conversationsStore = useConversationsStore();
</script>

<style scoped>

</style>