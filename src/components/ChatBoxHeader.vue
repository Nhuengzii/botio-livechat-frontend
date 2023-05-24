<template>
    <header class="relative flex-[1] h-full w-full bg-gray-100 glow py-[10px] border-b border-gray-300">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-start-1 col-end-7 row-start-2 overflow-hidden">
                <Suspense @pending="pending" @fallback="fallback" @resolved="resolved">
                    <template #default>
                        <ProfileUserMessage :datauser="datauser" />
                    </template>
                    <template #fallback>
                        <p>loading . . . .</p>
                    </template>
                </Suspense>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations'
import type { Conversation } from '@/types/conversation'
import ProfileUserMessage from './ProfileUserMessage.vue'
import ProfileCardSkeleton from './ProfileCardSkleton.vue'
interface Props {
    conversation_id: String
    datauser: Conversation
}

const props = defineProps<Props>()

const pending = () => {
    console.log("pending");
}

const fallback = () => {
    console.log("fallback");
}

const resolved = () => {
    console.log("resolved")
}

</script>

<style scoped></style>