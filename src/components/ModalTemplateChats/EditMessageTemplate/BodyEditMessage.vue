<template>
    <div class="flex items-center h-full">
        <template v-if="selectedTemplate === 'Button'">
            <div class="flex h-full">
                <div class="flex-1 shrink-0 flex h-full justify-center items-center">
                    <TemplateButton class="self-start sticky top-0" />
                </div>
            </div>
            <div class="h-full flex-[3] bg-gray-200 pl-6 pt-4 rounded-xl overflow-auto">
                <div class="flex flex-col">
                    <p class="text-base font-semibold pt-4"><span
                            class="text-red-400 text-xl font-bold pr-2">*</span>ชื่อของเทมเพลต</p>
                    <input type="text" v-model="name" placeholder="เทมเพลต"
                        class="h-8 my-2 px-2 w-[50%] shadow-lg rounded-lg">
                    <div class="flex items-center">
                        <span class="text-red-400 text-xl font-bold pr-2">*</span>
                        <button @click="selecImage"
                            class="my-4 rounded-lg self-start px-3 py-2 shadow-lg bg-white">เลือกรูปภาพ</button>
                        <p v-if="imagePreview" class="text-sm px-3 py-2 ml-1 w-48">{{ getImageFilename() }}
                        </p>
                    </div>
                    <div class="flex items-center justify-between w-96">
                        <p class="text-base font-semibold pt-4"><span
                                class="text-red-400 text-xl font-bold pr-2">*</span>หัวข้อ</p>
                        <p class="text-sm font-normal pt-4">{{ titleUserInput.length }}/50</p>
                    </div>
                    <input type="text" placeholder="ชื่อหัวข้อ" v-model="titleUserInput"
                        class="h-8 my-2 w-96 px-2 shadow-lg rounded-lg" maxlength="50">
                    <div class="flex items-center justify-between w-[70%]">
                        <p class="mt-2 text-base font-semibold"> <span
                                class="text-red-400 text-xl font-bold pr-2">*</span>ข้อความ</p>
                        <p class="text-sm font-normal mt-2">{{ modalStore.textUserInput.length }}/150</p>
                    </div>
                    <textarea type="text" placeholder="ข้อความ..." v-model="textUserInput"
                        class="h-44 w-[70%] px-2 py-1 mt-2  shadow-lg rounded-lg" maxlength="150" />
                </div>
                <!-- add button in template -->
                <p class="text-base font-semibold pt-4">ปุ่มในเทมเพลต</p>
                <template v-if="buttonList.length > 0">
                    <div v-for="index in buttonList.length" :key="index" class="flex flex-col justify-center pt-4 pb-6">
                        <p class="text-base font-semibold">ปุ่มที่ {{ index }}</p>
                        <div class="flex my-1">
                            <p class="px-4 py-1 w-48">ระบุชื่อของในปุ่ม {{ index }}</p>
                            <p class="px-4 py-1">{{ buttonList[index-1].title }}</p>
                        </div>
                        <div class="flex my-1">
                            <p class="px-4 py-1 w-48">ระบุ url ที่จะไปเมื่อกดปุ่มนี้</p>
                            <p class="px-4 py-1">{{ buttonList[index-1].url }}</p>
                        </div>
                        <button @click="actionDeleteButton(index-1)"
                            class="mt-2 ml-2 bg-red-500 shadow-lg px-4 py-1 self-start">
                            <span class="py-1 px-2">ลบปุ่ม</span>
                        </button>
                    </div>
                </template>
                <template v-if="buttonList.length <= 0 || isAddButton && buttonList.length <= 2">
                    <div class="flex flex-col justify-center pt-4 pb-6">
                        <p class="text-base font-semibold">ปุ่มที่ {{ 1 + buttonList.length }}</p>
                        <div class="flex my-1">
                            <p class="px-4 py-1 w-48"><span
                                    class="text-red-400 text-xl font-bold pr-2">*</span>ระบุชื่อของในปุ่ม {{ 1 +
                                        buttonList.length }}</p>
                            <input type="text" v-model="button.title" class="py-1">
                        </div>
                        <div class="flex my-1">
                            <p class="px-4 py-1 w-48"><span class="text-red-400 text-xl font-bold pr-2">*</span>ระบุ url
                                ที่จะไปเมื่อกดปุ่มนี้</p>
                            <input type="text" v-model="button.url" class="py-1 w-[60%]">
                        </div>
                        <button @click="actionSaveButton" class="mt-2 ml-2  bg-gray-300 shadow-lg px-4 py-1 self-start">
                            <span class="py-1 px-2">บันทึกปุ่ม</span>
                        </button>
                    </div>
                </template>
                <!--if button is not have more 3 buttons can click to add button-->
                <template v-else>
                    <template v-if="buttonList.length >= 1 && buttonList.length <= 2">
                        <button v-show="amountButton <= 3" @click="clickToAddButton" :disabled="amountButton >= 3"
                            class="rounded-full bg-gray-300 p-3">เพิ่มปุ่ม</button>
                    </template>
                </template>
                <div>
                </div>
            </div>
        </template>

        <template v-else-if="selectedTemplate === 'TextImage'">
            <div class="flex-[1] shrink-0 flex h-full justify-center items-center">
                <TemplateTextImage class="self-start" />
            </div>
            <div class="h-full flex-[3] bg-gray-200 pl-6 pb-3 rounded-xl">
                <div class="flex flex-col pl-2">
                    <p class="text-base font-semibold pt-4"><span
                            class="text-red-400 text-xl font-bold pr-2">*</span>ชื่อของเทมเพลต</p>
                    <input type="text" v-model="name" class="h-8 my-2 px-2 w-[50%] shadow-lg rounded-lg">
                    <!-- button select image-->
                    <div class="flex items-center">
                        <span class="text-red-400 text-xl font-bold pr-2">*</span>
                        <button @click="selecImage"
                            class="my-4 bg-gray-50 rounded-lg self-start px-3 py-2 shadow-lg hover:bg-green-100">เลือกรูปภาพ</button>
                        <p v-if="imagePreview" class="text-sm px-3 py-2 ml-1 w-48">{{ getImageFilename() }}
                        </p>
                    </div>
                    <!-- input detail in button -->
                    <div class="flex items-center justify-between w-96">
                        <p class="text-base font-semibold pt-4"><span
                                class="text-red-400 text-xl font-bold pr-2">*</span>หัวข้อ</p>
                        <p class="text-sm font-normal pt-4">{{ titleUserInput.length }}/50</p>
                    </div>
                    <input type="text" placeholder="ชื่อหัวข้อ" v-model="titleUserInput"
                        class="h-8 my-2 w-96 px-2 shadow-lg rounded-lg" maxlength="50">
                    <div class="flex items-center justify-between w-[70%]">
                        <p class="mt-2 text-base font-semibold"><span
                                class="text-red-400 text-xl font-bold pr-2">*</span>ข้อความ</p>
                        <p class="text-sm font-normal mt-2">{{ textUserInput.length }}/200</p>
                    </div>
                    <textarea type="text" placeholder="ข้อความ..." v-model="textUserInput"
                        class="h-44 w-[70%] px-2 py-1 mt-2  shadow-lg rounded-lg" maxlength="200" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import TemplateTextImage from '@/components/ModalTemplateChats/TemplateType/TemplateTextImage.vue';
import TemplateButton from '@/components/ModalTemplateChats/TemplateType/TemplateButton.vue';

import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
const modalStore = useModalStore()
const modalStoreRef = storeToRefs(modalStore)
const { selectedTemplate, titleUserInput, textUserInput, imagePreview, buttonList, name, button, isAddButton, amountButton, isSaveButton, selectedFileImage } = modalStoreRef;

// Computed property to check if the buttonList has reached the limit of 3 buttons
const isButtonLimitReached = computed(() => buttonList.value.length >= 3);

// Computed property to check if the button title and URL are not empty
const isButtonValid = computed(() => button.value.title.trim() !== '' && button.value.url.trim() !== '');

const selecImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.addEventListener('change', (event) => {
        handleFileSelect(event);
    });
}
const handleFileSelect = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        selectedFileImage.value = file;
        //console.log(modalStore.selectedFileImage)
        const reader = new FileReader();
        reader.onload = () => {
            imagePreview.value = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}

const getImageFilename = () => {
    if (imagePreview.value && selectedFileImage.value) {
        return selectedFileImage.value.name;
    }
    return '';
}

const actionDeleteButton = (index: number) => {
    if (amountButton.value >= 0) {
        
        amountButton.value--;
        buttonList.value.splice(index, 1);
        console.log(buttonList.value)
        console.log(`amountButton: ${amountButton.value}`)
        console.log(buttonList.value.length)
        console.log("delete button");
    }
}

const clickToAddButton = () => {
    if (buttonList.value.length >= 3 || amountButton.value >= 3) {
        isAddButton.value = false;
        return;
    }
    amountButton.value++;
    isAddButton.value = true;
}

// Action to save the button
const actionSaveButton = () => {
    if (isButtonLimitReached.value || !isButtonValid.value) {
        return;
    }

    const newButton = {
        title: button.value.title,
        url: button.value.url,
        id: Date.now(),
        isSave: true,
    };

    // Check if the button already exists in the buttonList
    isSaveButton.value = true;
    buttonList.value.push(newButton);
    console.log("Button saved:", newButton);
    button.value.url = '';
    button.value.title = '';
    // increase num button
    amountButton.value++;
    console.log(`isSaveButton: ${isSaveButton.value}`);
};

watch(buttonList, (newList) => {
    if (newList.length > 3) {
        buttonList.value = newList.slice(0, 3);
    }
});

</script>

<style scoped></style>
