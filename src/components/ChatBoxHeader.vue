<template>
    <header class="relative flex-[1] h-full w-full bg-blue-100 glow  border-b border-gray-300">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-start-1 col-end-7 row-start-2 overflow-hidden">
                <div class="flex  items-center justify-start pl-[20px]">
                    <div class="w-12 h-12 rounded-full">
                        <div></div>
                        <img v-if="props.conversation_id !== '-1'" :src="datauser?.participants[0].profilePicture" alt=""
                                    class="object-cover h-12 w-12 rounded-full">
                    </div>
                    <div v-if="props.conversation_id !== '-1'" class="flex flex-col ml-4">
                        <span class="">{{ props.datauser?.participants[0].username }}</span>
                        <div class="flex items-center relative">
                            <div
                                class="w-[14px] h-[14px] rounded-full bg-green-400 absolute -left-[27px] top-[10px]">
                            </div>
                            <span class=" pl-[4px] text-sm leading-5 text-gray-500">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import type { Message, Conversation } from '@/types/conversation'
interface Props {
    conversation_id: String
    datauser: Conversation
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>