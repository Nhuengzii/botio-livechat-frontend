<template>

</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import ShowListConversation from './ShowListConversation.vue';
import HeaderChatLeft from './HeaderChatLeft.vue';
const conversationsStore = useConversationsStore();

import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
onBeforeMount(async () => {
    await conversationsStore.fetchConversations(route.params.platform as string);
})





</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
