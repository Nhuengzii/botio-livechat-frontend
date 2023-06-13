<template>
    <div class="flex-[2] bg-white shrink-1 rounded-3xl mx-[10] ">
        <div v-if="conversationId !== '-1'" class="flex flex-col h-full overflow-x-hidden">

            <ChatBoxHeader :conversation_id="conversationId" :datauser="datauser" :isFetching="isFetching" />

            <main class="flex flex-col relative overflow-x-hidden w-full h-full bg-50 glow bg-gray-200"
                id="containMessage" ref="containMessage">
                <div class='grid grid-cols-12 gap-y-2'>
                    <template v-if="isFetching">
                        <SkletonBoxMessage />
                    </template>
                    
                    <template v-else>
                        <div v-for="(item, index) in messages" :key="item.conversationID" :class="{
                            'col-start-1 col-end-8 p-[12px] round-lg': item.source.sourceType === 'USER',
                            'col-start-6 col-end-13 p-3 rounded-lg': item.source.sourceType === 'ADMIN'
                        }">
                            <div :class="{
                                'flex flex-row': item.source.sourceType === 'USER',
                                'flex items-center justify-start flex-row-reverse': item.source.sourceType === 'ADMIN'
                            }">
                                <div v-if="item.source.sourceType === 'USER'"
                                    class='flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0'>
                                    <img :src="item.source.sourcePicture" alt=""
                                        class="object-cover h-12 w-12 rounded-full">
                                </div>
                                <div v-if="item.message" class="self-center relative py-2 px-4 shadow rounded-xl" :class="{
                                    'ml-3 text-sm bg-white': item.source.sourceType === 'USER',
                                    'mr-3 text-sm bg-indigo-100': item.source.sourceType === 'ADMIN'
                                }">
                                    <div>{{ item.message }}</div>
                                </div>
                                <div v-else class="self-center relative shadow rounded-2xl" :class="{
                                    'ml-3 text-sm bg-white ': item.source.sourceType === 'USER',
                                    'mr-3 text-sm bg-indigo-100': item.source.sourceType === 'ADMIN'
                                }">
                                    <img :src="item.attachments[0].payload.src" alt="" class="rounded-2xl">
                                </div>
                            </div>
                        </div>
                        <template v-if="conversationsRaw[currentPlatform].raw[conversationId].messages.someoneTyping">
                            <div>
                                <ChatBubble />
                            </div>
                        </template>
                    </template>
                </div>
            </main>
            <ChatBoxInput />
        </div>
    </div>
</template>

<script setup lang="ts">

import { useConversationsStore } from '@/stores/conversations';
import { useRoute } from 'vue-router';
import { nextTick, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue';
const messages = ref([] as Message[])
import type { Conversation, Message } from '@/types/conversation'
import router from '@/router';
import ChatBoxInput from './ChatBoxInput.vue';
import ChatBoxMessage from './ChatBoxMessage.vue';
import ChatBoxHeader from './ChatBoxHeader.vue';
import ChatBubble from './ChatBubble.vue';
import SkletonBoxMessage from './SkletonBoxMessage.vue';
import { storeToRefs } from 'pinia';



const conversationsStore = useConversationsStore();
const route = useRoute()
const conversationId = route.params.conversation_id as string;
let datauser: Conversation
if (route.query.platform) {
    datauser = conversationsStore.getConversationById(conversationId, route.query.platform as string)
}
else {
    datauser = conversationsStore.getConversationById(conversationId, route.params.platform as string)
}
const { conversationsRaw } = storeToRefs(conversationsStore)
const isFetching = ref(true)
const currentPlatform = ref('')

const scrollToBottom = () => {
    // Use document safely here
    let objContain = document.getElementById("containMessage") as any
    objContain.scrollTop = objContain?.scrollHeight

}


onMounted(async () => {
    isFetching.value = true;
    let conversationID = route.params.conversation_id as string;
    let currentConversation: Conversation | undefined
    if (route.query.platform) {
        currentConversation = await conversationsStore.fetchMessages(conversationID, route.query.platform as string)
        currentPlatform.value = route.query.platform as string
    }
    else {
        currentConversation = await conversationsStore.fetchMessages(conversationID, route.params.platform as string)
        currentPlatform.value = route.params.platform as string
    }
    isFetching.value = false;
    if (currentConversation == null) {
        router.replace({ path: `/livechat/${route.params.platform as string}/` })
        return
    }
    messages.value = currentConversation.messages.messages
    scrollToBottom()
})


onBeforeUpdate(() => {
    const newConversationId = route.params.conversation_id
    if (newConversationId !== conversationId) {

    }
})

onUpdated(() => {
    scrollToBottom()
})


</script>

<style scoped></style>
