<template>
    <template v-if="uiStore.is_createTemplateMessage">
        <div class="flex items-center justify-center">
            <button @click="uiStore.activeEditTemplateMessage" v-if="modalStore.selectedTemplate"
                class="py-3 px-8 rounded-3xl text-xl bg-[#00ABB3] text-white">ถัดไป</button>
        </div>
    </template>
    <template v-if="uiStore.is_editTemplateMessage">
        <div class="flex items-center justify-center">
            <!-- button create template -->
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
import { computed, ref } from 'vue';
import { useUIStore } from '@/stores/UI';
import { useModalStore, type Template } from '@/stores/modal';
import type { Conversation } from '@/types/conversation';
import Swal from 'sweetalert2';
const modalStore = useModalStore()
const uiStore = useUIStore()
const shopStore = useShopStore()
const isLoading = ref(false)
const canCreateTemplate = computed(() => {
    const { selectedTemplate, titleUserInput, textUserInput, imagePreview, buttonList } = modalStore;

    switch (selectedTemplate) {
        case 'TextImage':
            return titleUserInput && textUserInput && imagePreview;

        case 'Button':
            return titleUserInput && textUserInput && imagePreview && buttonList.length >= 1;

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
            const image_url = await botioLivechat?.uploadImage(modalStore.selectedFileImage);
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
                console.log(JSON.stringify(template, null, 2))
                const template_str = JSON.stringify(template);
                const template_id = await botioLivechat.saveTemplate(template_str);

                Swal.close();

                if (template_id) {
                    Swal.fire('สำเร็จ', 'สร้างเทมเพลตสำเร็จ', 'success');
                    //console.log(`template_id save : ${template_id}`);
                    modalStore.reset();
                    uiStore.finishCreateTemplate();
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'Failed to save template', 'error');
                    //console.log('Failed to save template');
                }
            }
        } catch (error) {
            Swal.fire('Error', 'เกิดข้อผิดพลาด ไม่สามรถสร้างเทมเพลตได้', 'error');
            console.error('Error saving template:', error);
        } finally {
        }
    }
};
</script>

<style scoped></style>