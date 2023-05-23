<template>
    <div class="flex-[2] bg-blue-300 shrink-1 rounded-3xl mx-[10] overflow-x-hidden">
        <div v-if="conversationId !== '-1'" class="flex flex-col h-full overflow-x-hidden">

            <ChatBoxHeader :conversation_id="conversationId" :datauser="datauser" />

            <main class="flex flex-col relative overflow-x-hidden w-[full] h-full bg-50 glow bg-red-100">
                <!--
                <div class="flex flex-col h-full w-[full] overflow-x-hidden">
                    <div v-for="i in 100" class="grid grid-cols-12 gap-y-2 bg-green-600">
                        <div class="col-start-1 col-end-8 p-[10px] rounded-lg">
                            <div class="flex flex-row items-center bg-green-300">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa tenetur maiores molestias? Eveniet, hic facilis aut quas aperiam sunt, tempore nulla totam voluptates corrupti animi iusto! Commodi nesciunt tenetur voluptas..{{ i }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <div class="flex flex-col h-full">
                    <div class='grid grid-cols-12 gap-y-2'>
                        <div v-for="item in messages" :key="item.messageID" :class="{
                            'col-start-1 col-end-8 p-[12px] round-lg': item.source.sourceType === 'USER',
                            'col-start-6 col-end-13 p-3 rounded-lg': item.source.sourceType === 'ADMIN'
                        }">
                            <div :class="{
                                'flex flex-row items-center': item.source.sourceType === 'USER',
                                'flex items-center justify-start flex-row-reverse': item.source.sourceType === 'ADMIN'
                            }">
                                <div v-if="item.source.sourceType === 'USER'"
                                    class='flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 flex-shrink-0'>
                                    <img :src="item.source.sourcePicture" alt=""
                                        class="object-cover h-12 w-12 rounded-full">
                                </div>
                                <div :class="{
                                    'relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl': item.source.sourceType === 'USER',
                                    'relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl': item.source.sourceType === 'ADMIN'
                                }">
                                    <div>{{ item.message }}</div>
                                </div>
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
import { onBeforeUpdate, onMounted, ref } from 'vue';
const messages = ref([] as Message[])
import type { Message, Conversation } from '@/types/conversation'
import router from '@/router';
import ChatBoxInput from './ChatBoxInput.vue';
import ChatBoxMessage from './ChatBoxMessage.vue';
import ChatBoxHeader from './ChatBoxHeader.vue';


const conversationsStore = useConversationsStore();
const route = useRoute()
const conversationId = route.params.conversation_id as string;
const datauser: Conversation = conversationsStore.getConversationById(conversationId, route.params.platform as string)

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
