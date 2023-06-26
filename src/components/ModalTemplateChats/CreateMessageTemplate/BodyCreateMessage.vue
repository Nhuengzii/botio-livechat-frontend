<template>
    <div class="flex flex-col">
        <h1 class="text-xl pl-4 mx-2 pb-4">เลือกรูปแบบเทมเพลตที่ต้องการจะสร้าง</h1>
        <div class="flex flex-warp  items-start bg-green-200">


            <!-- button template -->

            <button @click="modalStore.selectTemplate('Button')" class="hover:bg-gray-200" :class="{ 'bg-gray-200': modalStore.selectedTemplate === 'Button' }">
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
                            <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่1</button>
                            <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่2</button>
                            <button class="bg-gray-100 hover:bg-gray-100 py-2 rounded-b-lg">ปุ่มกดที่3</button>
                        </div>
                    </div>
                </div>
            </button>   

            <!-- image+text template -->
            <button @click="modalStore.selectTemplate('TextImage')" class="hover:bg-gray-200" :class="{ 'bg-gray-200': modalStore.selectedTemplate === 'TextImage' }">
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
        </div>
        <button @click="uiStore.activeEditTemplateMessage" class="self-center bg-red-100">ถัดไป</button>

    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
import {useModalStore } from '@/stores/modal'
import { ref, type Ref } from 'vue';
import ModalTemplateChat from '@/components/ModalTemplateChat.vue';
const uiStore = useUIStore()
const modalStore = useModalStore()
const showEditModal = ref(false);
const selectedTemplate = ref<string | number | null>(null);
function selectTemplate(template: string | number) {
    selectedTemplate.value = template;
}
function submitSelection() {
    console.log('Selected Template:', selectedTemplate.value);
}



// select image
const selectedImage = ref<string | null>(null);
const openImageDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => displaySelectedImage(event, selectedImage);
    input.click();
};


const displaySelectedImage = (event: Event, selectedImage: Ref<string | null>) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = () => {
            selectedImage.value = reader.result as string;
        };

        reader.readAsDataURL(file);
    } else {
        selectedImage.value = null;
    }
};
</script>

<style scoped></style>