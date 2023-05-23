<template>
    <div class="grid grid-cols-2 px-[14px] pb-[.5rem] pt-[10px]">
        <div class="flex justify-center items-center py-[1rem]">
            <p class="text-base">ข้อความทั้งหมด</p>
            <div class="flex bg-green-100 px-[14px] py-[4px] items-center justify-center ml-[10px]">
                <span class="text-base">14</span>
            </div>
        </div>
        <div class=""></div>
    </div>
    <div class="flex bg-red-100 py-[1rem] justify-center">
        <button class="flex bg-red-200 w-[85%] h-full py-[0.75rem] rounded-[20px]">
            <div class="ml-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
            <span class="ml-[20px] text-base">search</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
const props = defineProps(['numConversation'])
const conversationsStore = useConversationsStore();
</script>

<style scoped></style>