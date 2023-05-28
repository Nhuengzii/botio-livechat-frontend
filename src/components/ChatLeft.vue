<template>
    <div class="flex-1 bg-gray-100  rounded-[18px] mx-[10px] relative max-h-[100%]  overflow-hidden pb-[10px] ">
        <!-- Show all number converation -->
        <HeaderChatLeft />
        <!-- Search name box -->
        <div class=" flex  justify-around py-[1rem] ">
            <div v-if="status_seatch" class="">
                <button type="button" @click="{ status_seatch = false; message = '' }"
                    class="text-white bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center  ml-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H6M12 5l-7 7 7 7" />
                    </svg>
                    <span class="sr-only">Icon description</span>
                </button>
            </div>
            <div class="relative w-full mr-4 ">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>

                </div>
                <input type="text" id="voice-search" @click="status_seatch = true"
                    class="ml-2 bg-gray-50  border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ค้นหา... " v-model="message">
            </div>
        </div>

        <!-- end search name box-->

        <ShowListConversation v-if="!status_seatch" />
        <Showseatch v-if="status_seatch" :propA="message" />
    </div>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import ShowListConversation from './ShowListConversation.vue';
import Showseatch from './ShowSeatch.vue';
import HeaderChatLeft from './HeaderChatLeft.vue';
const conversationsStore = useConversationsStore();
import { ref } from 'vue'
const status_seatch = ref(false);
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
onBeforeMount(async () => {
    await conversationsStore.fetchConversations(route.params.platform as string);

})
let message = ref("");
defineProps({
    propA: String,
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
