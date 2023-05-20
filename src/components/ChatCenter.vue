<template>
    <div class="flex-[2] bg-green-100 rounded-[18px] mx-[10px] min-w-[512px]">
        <div class="flex flex-col h-full">
            <header class="relative flex-[1] h-full w-full bg-blue-100 glow  border-b border-gray-300">
                <div class="grid grid-cols-12 gap-3">
                    <div class="col-start-1 col-end-7 row-start-2 overflow-hidden">
                        <div class="flex  items-center justify-start pl-[20px]">
                            <div class="w-12 h-12 rounded-full">
                                <div></div>
                                <img v-if="conversationId !== '-1'" :src="datauser?.participants[0].profilePicture" alt=""
                                    class="object-cover h-12 w-12 rounded-full">
                            </div>
                            <div v-if="conversationId !== '-1'" class="flex flex-col ml-4">
                                <span class="">{{ datauser?.participants[0].username }}</span>
                                <div class="flex items-center relative">
                                    <div
                                        class="w-[14px] h-[14px] rounded-full bg-green-400 absolute -left-[27px] top-[10px]">
                                    </div>
                                    <span class=" pl-[4px] text-sm leading-5 text-gray-500">Active</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>


            <main class="flex-[7] flex-col relative overflow-x-auto w-full h-full bg-blue-50 glow">
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


            <footer class="flex grow-0 basis-auto shrink-0 bg-red-100 justify-center">
                <form v-if="conversationId !== '-1'" class="w-full px-[8px] py-[8px]">
                    <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label for="comment" class="sr-only">Your comment</label>
                            <textarea id="comment" rows="4"
                                class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="submit"
                                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Send Message
                            </button>
                            <div class="flex pl-0 space-x-1 sm:pl-2">
                                <button type="button"
                                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="sr-only">Attach file</span>
                                </button>
                                <button type="button"
                                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="sr-only">Set location</span>
                                </button>
                                <button type="button"
                                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="sr-only">Upload image</span>
                                </button>
                                <button type="button"
                                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="sr-only">Upload image</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useConversationStore } from '../stores/conversation';
import { useRoute } from 'vue-router';
import { watch, reactive, computed, onBeforeUpdate, onMounted, onBeforeMount, ref } from 'vue';
const messages = ref([] as Message[])

type Message = {
    conversationID: string,
    messageID: string,
    timeStamp: number,
    source: Source,
    message: string,
}

type Source = {
    sourceID: string,
    sourceName?: string
    sourcePicture?: string,
    sourceType: "USER" | "ADMIN",
}

const conversationStore = useConversationStore();
const route = useRoute()
const conversationId = route.params.conversation_id as string;
const datauser = conversationStore.getConversationById(conversationId)

onMounted(async () => {
    let conversationID = route.params.conversation_id as string;
    let currentConversation = await conversationStore.fetchMessages(conversationID)
    if (currentConversation == null) {
        console.log("currentConversation is null")
        return
    }
    messages.value = currentConversation.messages
})


onBeforeUpdate(() => {
    const newConversationId = route.params.conversation_id
    if (newConversationId !== conversationId) {
    }
})


const checkConversationId = () => {
    if (conversationId !== "-1") {
        return true;
    }
}

</script>
