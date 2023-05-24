<template>
    <div v-if="route.params.platform === 'facebook'  " class="flex-1 bg-gray-100  rounded-[18px] mx-[10px] relative max-h-[100%]  overflow-hidden pb-[10px] " >
            <!-- Search and show all number converation -->
            <HeaderChatLeft/>
            <div class=" flex  justify-around py-[1rem] " v-if="!status_seatch">
                <button class="flex bg-blue-200 w-[85%] h-full items-center justify-start py-[.75rem] rounded-[20px]" @click="status_seatch=!status_seatch">
                    <div class="pl-[20px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <span class="pl-[20px] text-base leading-6 text-gray-900">ค้นหาจากชื่อ</span>
                </button>
            </div>
            <div class=" flex flex-row justify-around py-[1rem] " v-if="status_seatch">
                <button class="flex bg-blue-200 w-[25%] h-full items-center justify-start py-[.75rem] rounded-[20px]" @click="status_seatch=!status_seatch">
                </button>
                <div class=" pl-[20px]">
                <div  style="padding: 0px 20px 14px 1.25rem; position: relative;">
                    <input  placeholder="ค้นหา..." class="input__search" v-model="message"> 
                    <div  title="icon" ></div>
                </div>
                </div>
            </div>
            <!-- end search name box-->
            
            <ShowListConversation v-if="!status_seatch"/>
            <Showseatch v-if="status_seatch" :propA="message"/>
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
let message= ref("");
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
