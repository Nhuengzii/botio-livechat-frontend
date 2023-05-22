<template>
    <div
        class="flex-1 bg-green-100 rounded-[18px] mx-[10px] relative max-h-[100%] overflow-hidden pb-[10px] overscroll-contain font-serif">
        <!-- num message box-->
        <div v-if="$route.params.platform === 'facebook'" class="w-full h-full">
            <div class="grid grid-cols-2 px-[14px] pb-[1.25rem] pt-[20px]">
                <div class="bg-red-100 flex items-center justify-center py-[1rem]">
                    <p class="text-base">ข้อความทั้งหมด</p>
                    <div class=" flex w-[25px] h-[25px] bg-blue-400 rounded-full items-center justify-center ml-[10px]">
                        <span class="text-white">{{ conversationsStore.conversations.length }}</span>
                    </div>
                </div>
                <div class="bg-red-200 justify-end"></div>
            </div>
            <!-- end num message box-->

            <!-- search name box-->
            <div class=" flex bg-blue-100 justify-around py-[1rem]">
                <!---<button class="flex bg-blue-200 w-[85%] h-full items-center justify-start py-[.75rem] rounded-[20px]">
                    <div class="pl-[20px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        
                    </div>
                    <span class="pl-[20px] text-base leading-6 text-gray-900">ค้นหาจากชื่อ</span>
                </button>-->
                <div class=" pl-[20px]">
                <div  style="padding: 0px 20px 14px 1.25rem; position: relative;"><p >ค้นหาจากชื่อ</p> 
                    <input  placeholder="ค้นหา..." class="input__search" v-model="message"> 
                    <div  title="icon" ></div>
                </div>
            </div>
            </div>
            <!-- end search name box-->

            <!-- search tag name-->
            <div class="bg-red-300 justify-around py-[1rem]">
            </div>
            <!-- end search tag name-->

            <!--- conversation list-->
            <div class="relative flex flex-col overflow-hidden w-full h-full">
                <div class="relative w-full h-full bg-white overflow-hidden">
                    <div class="max-h-[80%] absolute inset-0 top-0 left-0 right-0 overflow-scroll scrollbar-hide pb-[36px]">
                        <div class="relative flex flex-col" v-if="message==''">
                            <div v-for="{ conversationID, conversationPicture, lastActivity, participants } in conversationsStore.conversations"
                                class="flex py-[4px] pr-[4px]">
                                <div class="w-full">
                                    <router-link :to="{ name: 'Conver', params: { conversation_id: conversationID } }"
                                        class="flex px-[14px] pt-[20px] pb-[1.25rem] ml-[10px] border-2 rounded-[20px]" v-if="filteredList(participants[0].username)">
                                        <div class="grow-1 shrink-0 w-[45px] h-[45px] mr-[20px]">
                                            <div class="overflow-hidden w-[45px] h-[45px] bg-blue-200 rounded-full">
                                                <img v-if="conversationPicture" :src="conversationPicture" alt=""
                                                    class="object-cover w-full h-full rounded-full">
                                                <img v-else :src="participants[0].profilePicture" alt=""
                                                    class="object-cover w-full h-full rounded-full">
                                            </div>
                                        </div>
                                        <div class="grow-2 overflow-hidden">
                                            <div class="flex justify-between">
                                                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                                                    participants[0].username }}</span>
                                            </div>
                                            <div class="flex items-end justify-between whitespace-nowrap">
                                                <span
                                                    class="overflow-hidden text-ellipsis whitespace-nowrap mt-1 truncate text-xs leading-5 text-gray-500">{{
                                                        lastActivity }}</span>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="relative flex flex-col " v-if="message!=''">
                            <div v-for="{ conversationID, conversationPicture, participants } in conversationsStore.conversations"
                                class="flex py-[1px] pr-[4px]">
                                <div class="w-full">
                                    <router-link :to="{ name: 'Conver', params: { conversation_id: conversationID } }"
                                        class="flex px-[14px] pt-[20px] pb-[1.25rem] ml-[10px] border-2 rounded-[20px]" v-if="filteredList(participants[0].username)">
                                        <div class="grow-1 shrink-0 w-[45px] h-[45px] mr-[20px]">
                                            <div class="overflow-hidden w-[45px] h-[45px] bg-blue-200 rounded-full">
                                                <img v-if="conversationPicture" :src="conversationPicture" alt=""
                                                    class="object-cover w-full h-full rounded-full">
                                                <img v-else :src="participants[0].profilePicture" alt=""
                                                    class="object-cover w-full h-full rounded-full">
                                            </div>
                                        </div>
                                        <div class="grow-2 overflow-hidden">
                                            <div class="flex justify-between">
                                                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                                                    participants[0].username }}</span>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--- end conversation list-->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useConversationsStore } from '@/stores/conversations';
const conversationsStore = useConversationsStore();
import { onBeforeMount } from 'vue';
onBeforeMount(async () => {
    await conversationsStore.fetchConversations();
})
let message= ref("");
function filteredList(text:String) {
  
  if(text.toLowerCase().includes(message.value.toLowerCase())){
    return true;
  }
  else{
    return false;   
  }
}
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
