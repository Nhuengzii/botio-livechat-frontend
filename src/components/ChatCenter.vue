<template>
    <div class="flex-[2] bg-green-100 rounded-[18px] mx-[10px] min-w-[512px] flex-shrink-1">
        <div v-if="conversationId !== '-1'" class="flex flex-col h-full">
            <ChatBoxHeaderVue :datauser="datauser" :conversation_id="conversationId"/>
            <ChatBoxMessage :message="messages"/>
            <ChatBoxInput/>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useConversationsStore } from '@/stores/conversations';
import { useRoute } from 'vue-router';
import { onBeforeUpdate, onMounted, ref } from 'vue';
const messages = ref([] as Message[])
import type { Message, Conversation } from '@/types/conversation'
import router from '@/router';
import ChatBoxInput from './ChatBoxInput.vue';
import ChatBoxMessage from './ChatBoxMessage.vue';
import ChatBoxHeaderVue from './ChatBoxHeader.vue';


const conversationsStore = useConversationsStore();
const route = useRoute()
const conversationId = route.params.conversation_id as string;
const datauser: Conversation = conversationsStore.getConversationById(conversationId)

onMounted(async () => {
    let conversationID = route.params.conversation_id as string;
    let currentConversation = await conversationsStore.fetchMessages(conversationID, route.params.platform as string)
    if (currentConversation == null) {
        router.replace({ path: `/${route.params.platform as string}/` })
        return
    }
    messages.value = currentConversation.messages.messages
    
})


onBeforeUpdate(() => {
    const newConversationId = route.params.conversation_id
    if (newConversationId !== conversationId) {
    }
})

</script>
