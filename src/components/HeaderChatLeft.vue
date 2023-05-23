<template>
    <div class="w-[25%] h-full bg-green-400 rounded-[18px]">
        <div v-if="$route.params.platform === 'facebook'" class="w-full h-full">
            <div class="grid grid-cols-1 px-[14px] pb-[1.25rem] pt-[20px] w-full">
                <div class="flex gap-3 items-center   rounded-2xl ml-3">
                <div  >
            ข้อความทั้งหมด
            <span class=" bg-blue-400 rounded-full items-center justify-center pl-3 pr-3 pt-1 pb-1">{{conversationsStore.conversations.length }} </span></div>

            </div>
            </div>



           

        </div>
    </div>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import type { Text } from 'vue';
const props = defineProps(['numConversation'])
const conversationsStore = useConversationsStore();
</script>

<style scoped></style>