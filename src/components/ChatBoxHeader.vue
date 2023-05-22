<template>

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