<template>
    <div class="flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0">
        <img :src="conversation.participants[0].profilePic.src" alt="" class="object-cover h-12 w-12 rounded-full">
    </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
    message: Message
    conversation: Conversation
}>()
</script>

<style scoped>

</style>