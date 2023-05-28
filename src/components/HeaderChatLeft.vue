<template>
    <aside class="w-[100%] h-120 bg-gray-100 rounded-t-[18px] ">
        <div v-if="$route.params.platform === 'facebook'" class="w-full h-full">
            <div class="grid grid-cols-1 px-[14px] pb-[1.25rem] pt-[20px] w-full">
                <div class="flex gap-3 items-center   rounded-2xl ml-3">
                    <div>ข้อความทั้งหมด
                        <span class=" bg-blue-400 rounded-full items-center justify-center pl-3 pr-3 pt-1 pb-1">{{
                            conversationsStore.conversations($route.params.platform).length
                        }} </span>
                    </div>
                </div>
            </div>
            <!-- end num message box-->

        </div>
    </aside>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import type { Text } from 'vue';
const props = defineProps(['numConversation'])
const conversationsStore = useConversationsStore();
</script>



<style scoped></style>
