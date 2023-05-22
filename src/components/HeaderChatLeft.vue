<template>

        
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
const props = defineProps(['numConversation'])
const conversationsStore = useConversationsStore();
</script>

<style scoped>

</style>