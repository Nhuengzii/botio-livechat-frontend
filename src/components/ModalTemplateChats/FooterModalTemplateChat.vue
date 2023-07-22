<template>
    <template v-if="uiStore.is_createTemplateMessage">
        <div class="flex items-center justify-center">
            <button @click="uiStore.activeEditTemplateMessage" v-if="modalStore.selectedTemplate"
                class="py-3 px-8 rounded-3xl text-xl bg-[#00ABB3] text-white">ถัดไป</button>
        </div>
    </template>
    <template v-if="uiStore.is_editTemplateMessage">
        <div class="flex flex-col items-center justify-center">
            <!-- button create template -->
            
            <p v-if="!isTitleValid" class="text-base text-red-500 font-semibold">กรุณาระบุหัวข้อ</p>
            <p v-if="!isMessageValid" class="text-base text-red-500 font-semibold">กรุณาระบุข้อความ</p>
            <p v-if="!isImageValid" class="text-base text-red-500 font-semibold">กรุณาเลือกรูปภาพ</p>
            <p v-if="!isNameValid" class="text-base text-red-500 font-semibold">กรุณาระบุชื่อของเทมเพลต</p>
            <template v-if="selectedTemplate === 'Button'">
                <p v-if="!isButtonValid" class="text-base text-red-500 font-semibold">ต้องมีปุ่มอย่างน้อย 1 ปุ่ม</p>
            </template>
            <button v-show="canCreateTemplate && !isLoading" @click="handleButtonCreateTemplate" :disabled="isLoading"
                class="py-3 px-4 rounded-2xl bg-[#00ABB3] text-white text-xl">
                สร้างเทมเพลต
            </button>
        </div>
    </template>
</template>

<script setup lang="ts">

const { platform } = defineProps<{
    platform: string
}>()

import BotioLivechat from '@/lib/BotioLivechat'
import { useShopStore } from '@/stores/shop'
import { computed, ref, watch } from 'vue';
import { useUIStore } from '@/stores/UI';
import { useModalStore, type Template } from '@/stores/modal';
import type { Conversation } from '@/types/conversation';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
const modalStore = useModalStore()
const modalStoreRef = storeToRefs(modalStore)
const uiStore = useUIStore()
const shopStore = useShopStore()
const isLoading = ref(false)
const { selectedTemplate, titleUserInput, textUserInput, imagePreview, buttonList, name, selectedFileImage } = modalStoreRef;

// Watch for changes in titleUserInput
const isTitleValid = computed(() => {
    return titleUserInput.value.trim() !== '';
});

const isMessageValid = computed(() => {
    return textUserInput.value.trim() !== '';
});

const isImageValid = computed(() => {
    return imagePreview.value.trim() !== '';
});

const isNameValid = computed(() => {
    return name.value.trim() !== '';
});

const isButtonValid = computed(() => {
    if (buttonList.value.length >= 1){
        return true
    }
})


const canCreateTemplate = computed(() => {
    switch (selectedTemplate.value) {
        case 'TextImage':
            return titleUserInput.value && textUserInput.value && imagePreview.value && name.value ;

        case 'Button':
            return titleUserInput.value && textUserInput.value && imagePreview.value && buttonList.value.length  >= 1 && name.value ;

        default:
            return false;
    }
});

const handleButtonCreateTemplate = async () => {
    if (canCreateTemplate.value && !isLoading.value) {
        isLoading.value = true;
        modalStore.platform = platform;
        const botioLivechat = new BotioLivechat(shopStore.shop_id)
        try {
            const image_url = await botioLivechat?.uploadImage(selectedFileImage.value);
            if (image_url) {
                Swal.fire({
                    title: 'Saving Template',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    },
                });

                const template: Template = {
                    id: Date.now().toString(), // id ปลอม
                    type: modalStore.selectedTemplate,
                    platform: modalStore.platform,
                    name: modalStore.name,
                    elements: [
                        {
                            title: modalStore.titleUserInput,
                            message: modalStore.textUserInput,
                            picture: image_url,
                            buttons: modalStore.buttonList.map((button) => ({
                                id: button.id,
                                title: button.title,
                                url: button.url,
                            })),
                        },
                    ]
                };
                const template_str = JSON.stringify(template);
                const template_id = await botioLivechat.saveTemplate(template_str);

                // change real id
                template.id = template_id
                modalStoreRef.getTemplates.value.push(template)
                Swal.close();

                if (template_id) {
                    //await modalStore.updatedDataTemplate();
                    Swal.fire('สำเร็จ', 'สร้างเทมเพลตสำเร็จ', 'success');
                    //console.log(`template_id save : ${template_id}`);
                    modalStore.reset();
                    uiStore.finishCreateTemplate();
                    
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามรถสร้างเทมเพลตได้', 'error');
                    //console.log('Failed to save template');
                }
            }
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด ', 'ไม่สามรถสร้างเทมเพลตได้', 'error');
            console.error('Error saving template:', error);
        } finally {
        }
    }
};
</script>

<style scoped></style>