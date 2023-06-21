<template>
    <div class="flex h-10 w-10 rounded-full bg-inherit flex-shrink-0 mr-4">
        <img :src="conversation.participants[0].profilePic.src" alt="" class="object-cover h-10 w-10 rounded-full"/>
    </div>    
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
    conversation: Conversation
}>()
</script>

<style scoped></style>
