<template>
    <footer class="flex grow-0 basis-auto shrink-0 bg-gray-200 justify-center">
        <form class="w-full px-[8px] py-[8px]">
            <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <textarea id="comment" rows="4"
                        class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        v-model="newMessage" placeholder="Write a comment..." required></textarea>
                </div>
                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button type="button" @click="sendMessage"
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
                        <button type="button" id="show-modal" @click="showModal = true"
                            class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chat-dots" viewBox="0 0 16 16">
                                <path
                                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                <path
                                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                            </svg>
                            <span class="sr-only">Messaging</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>


        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal" @close="showModal = false">
                <template #header>
                    <h3>custom header</h3>
                </template>
            </modal>
        </Teleport>
    </footer>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useConversationsStore } from '@/stores/conversations';
import { useRoute, } from 'vue-router';
import Modal from './Modal.vue'

const showModal = ref(false)

const conversationsStore = useConversationsStore();
const newMessage = ref('');
const route = useRoute()
const conversationId = route.params.conversation_id as string;
const platform = ref('')

// watch newMessage
watch(newMessage, (newVal, oldVal) => {
    if (oldVal.length === 0 && newVal.length > 0) {
        conversationsStore.setTypingStatus(conversationId, platform.value, true)
    }
    else if (oldVal.length > 0 && newVal.length === 0) {
        conversationsStore.setTypingStatus(conversationId, platform.value, false)
    }
})
onMounted(() => {
    if (route.query.platform) {
        platform.value = route.query.platform as string
    }
    else {
        platform.value = route.params.platform as string
    }
})

async function sendMessage() {
    const currentConversation = conversationsStore.getConversationById(route.params.conversation_id as string, route.params.platform as string)
    try {
        const text = newMessage.value;
        newMessage.value = '';
        await conversationsStore.sendTextMessage(route.params.conversation_id as string, currentConversation.participants[0].userID, text, route.params.platform as string)
        console.log("Sending true")
    }
    catch {
        console.log("Sending new message failed")
    }

}
async function a() {
    console.log('a')
}
</script>

<style scoped></style>
