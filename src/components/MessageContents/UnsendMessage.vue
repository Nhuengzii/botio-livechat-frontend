<template v-if="message.source.userType === 'user'">
    <div class="flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0">
        <img :src="conversation.participants[0].profilePic.src" alt="" class="object-cover h-12 w-12 rounded-full">
    </div>

    <div class="self-center relative py-2 px-4 shadow rounded-xl ml-4 text-sm bg-white border-2 border-slate-200">
        <p>{{ message.message }}</p>
    </div>
</template>

<script lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
import { formatTimestamp } from "@/lib/Time"
defineProps<{
    message: Message
    conversation: Conversation
}>()
</script>

<style scoped></style>