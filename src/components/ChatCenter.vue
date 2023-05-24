<template>
    <div class="flex-[2] bg-white shrink-1 rounded-3xl mx-[10] ">
        <div v-if="conversationId !== '-1'" class="flex flex-col h-full overflow-x-hidden">

            <ChatBoxHeader :conversation_id="conversationId" :datauser="datauser" />

            <main class="flex flex-col relative overflow-x-hidden w-[full] h-full bg-50 glow bg-gray-200" id="containMessage" ref="containMessage" >
                <div class='grid grid-cols-12 gap-y-2'>
                    <div  v-for="(item, index) in messages" :key="index" :class="{
                        'col-start-1 col-end-8 p-[12px] round-lg': item.source.sourceType === 'USER',
                        'col-start-6 col-end-13 p-3 rounded-lg': item.source.sourceType === 'ADMIN'
                    }">
                        <div :class="{
                            'flex flex-row': item.source.sourceType === 'USER',
                            'flex items-center justify-start flex-row-reverse': item.source.sourceType === 'ADMIN'
                        }">
                            <div v-if="item.source.sourceType === 'USER'"
                                class='flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0'>
                                <img :src="item.source.sourcePicture" alt="" class="object-cover h-12 w-12 rounded-full">
                            </div>
                            <div class="self-center" :class="{
                                'relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl': item.source.sourceType === 'USER',
                                'relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl': item.source.sourceType === 'ADMIN'
                            }">
                                <div>{{ item.message }}</div>
                                <div>{{ messages[messages.length-1].message }}</div>
                            </div>
                        </div>
                    </div>
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
import type { Message, Conversation } from '@/types/conversation'
import router from '@/router';
import ChatBoxInput from './ChatBoxInput.vue';
import ChatBoxMessage from './ChatBoxMessage.vue';
import ChatBoxHeader from './ChatBoxHeader.vue';



const conversationsStore = useConversationsStore();
const route = useRoute()
const conversationId = route.params.conversation_id as string;
const datauser: Conversation = conversationsStore.getConversationById(conversationId)

const scrollToBottom = () => {
    // Use document safely here
    let objContain = document.getElementById("containMessage") as any
    console.log(objContain)
    objContain.scrollTop = objContain?.scrollHeight
    
}





onMounted(async () => {
    let conversationID = route.params.conversation_id as string;
    let currentConversation = await conversationsStore.fetchMessages(conversationID, route.params.platform as string)
    if (currentConversation == null) {
        router.replace({ path: `/${route.params.platform as string}/` })
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
