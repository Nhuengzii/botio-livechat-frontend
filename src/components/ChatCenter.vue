<template>
    <div class="flex-[2] bg-blue-300 shrink-0 rounded-3xl mx-[10]">
        <div v-if="route.params.conversation_id == '-1'" class="flex flex-col h-full">
            <header class="relative flex flex-[1] h-full w-full bg-red-200">
                <div class="grid grid-cols-12">

                </div>
            </header>

            <main class="flex flex-col relative overflow-x-auto w-full h-full bg-50 glow bg-red-100 rounded-3xl">
                <div class="flex flex-col h-full">
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-y-2">
                        <div class="col-start-1 col-end-8 p-[12px] rounded-lg">
                            <div class="flex flex-row items-center">
                                <div class="flex items-center justify-center justify-center h-12 w-12 rounded-full bg-indigo-500 shrink-0">
                                    <img src="" alt="" class="object-cover w-12 h-12 rounded-full">
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
