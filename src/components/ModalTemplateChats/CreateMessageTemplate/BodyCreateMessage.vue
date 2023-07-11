<template>
    <div class="flex flex-col">
        <h1 class="text-xl pl-4 mx-2 pb-4">เลือกรูปแบบเทมเพลตที่ต้องการจะสร้าง</h1>
        <div class="flex flex-warp  items-start">


            <!-- button template -->

            <button @click="modalStore.selectTemplate('Button')" class="hover:bg-gray-200"
                :class="{ 'bg-gray-200': modalStore.selectedTemplate === 'Button' }">
                <div class="flex mx-2 my-4 px-4">
                    <div class="bg-white  border-2 rounded-lg">
                        <div class="flex items-center justify-center w-52 h-32 bg-blue-700 rounded-t-lg">
                            <p class="text-white">image</p>
                            <img src="" alt="">
                        </div>
                        <div class="border-b-2 flex flex-col items-start">
                            <h1 class="break-all pl-3 pt-2 font-semibold">หัวข้อ</h1>
                            <p class="break-all pl-3 pb-4">ข้อความ . . .</p>
                        </div>
                        <div class="flex flex-col">
                            <button class="bg-gray-50 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่1</button>
                            <button class="bg-gray-50 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่2</button>
                            <button class="bg-gray-50 hover:bg-gray-100 py-2 rounded-b-lg">ปุ่มกดที่3</button>
                        </div>
                    </div>
                </div>
            </button>

            <!-- image+text template -->
            <template v-if="conversation.platform !== 'line'">
            
                <button @click="modalStore.selectTemplate('TextImage')" class="hover:bg-gray-200"
                    :class="{ 'bg-gray-200': modalStore.selectedTemplate === 'TextImage' }">
                    <div class="flex mx-2 my-4 px-4">
                        <div class="bg-white  border-2 rounded-lg">
                            <div class="flex items-center justify-center w-52 h-44 bg-blue-700 rounded-t-lg">
                                <p class="text-white">image</p>
                                <img src="" alt="">
                            </div>
                            <div class="border-b-2 flex flex-col items-start">
                                <h1 class="break-all pl-3 pt-2 font-semibold">หัวข้อ</h1>
                                <p class="break-all pl-3 pb-4">ข้อความ . . .</p>
                            </div>
                        </div>
                    </div>
                </button>
            </template>
        </div>


    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal'
import type { Conversation } from '@/types/conversation';
const modalStore = useModalStore()
const props = defineProps<{
    conversation:  Conversation,
 }>()





// select image


</script>

<style scoped></style>
