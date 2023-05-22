<template>

</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import { onBeforeMount } from 'vue';

import { useRoute } from 'vue-router';
const conversationsStore = useConversationsStore();
const route = useRoute();
onBeforeMount(async () => {
    await conversationsStore.fetchConversations(route.params.platform as string);
})
</script>

<style scoped>

</style>