<template>
    <div class="py-10 flex items-center">
        <!-- search chat template -->
        <div class="flex-[8] basis-auto bg-white py-4 mr-3 rounded-2xl shadow-sm">
            <p class="px-8 color-gray-100">ค้นหาด้วย ชื่อ หรือรายละเอียดข้อความ</p>
        </div>

        <!-- create chat template -->
        <button @click="uiStore.activeCreateTemplateMessage"
            class="flex flex-[1] basis-auto bg-[#00ABB3] py-2 px-4 justify-center items-center rounded-2xl">
            <font-awesome-icon :icon="['fas', 'circle-plus']" size="2xl" />

            <div class="rounded-2xl px-2 py-1">
                <p class="text-white font-medium text-base">สร้างเทมเพลตข้อความสำหรับ</p>

            </div>
        </button>
        <!-- end create chat template -->

        <!-- space -->
        <div class="flex-[5]"></div>
        <!-- space -->
    </div>
    <div class="flex flex-wrap">
        <div v-for="template, index in modalStore.convertTemplates" :key="template.id"
            class="flex flex-cols basis-auto w-96 bg-white rounded-xl mx-2 my-2  items-center">

            <template v-if="template.platform === conversation.platform">


                <template v-if="template.type === 'Button'">
                    <TemplateButton />
                </template>
                <template v-else-if="template.type === 'TextImage'">
                    <TemplateTextImage />
                </template>

                <div class="flex flex-[10] basis-auto py-2 justify-center items-center">
                    <div class="flex justify-center items-center">
                        <p>{{ template.name }}</p>
                    </div>
                </div>

                <div class="flex flex-[2] basis-auto mx-1 justify-center items-center">
                    <button @click="handleSendTemplate(index, template.platform)"
                        class="flex py-1 px-1 rounded-2xl bg-blue-dark items-center justify-center hover:bg-blue-700">
                        <font-awesome-icon icon="paper-plane" style="color: #00abad;" />
                        <p class="text-sm font-semibold px-2 py-1 text-white">ส่งข้อความ</p>
                    </button>
                </div>

                <!-- edit template -->
                <!-- <div class="flex-[1] px-1 items-center justify-center">
                        <button @click="" class="flex">
                            <font-awesome-icon :icon="['fas', 'pen']" />
                        </button>
                    </div> -->

                <!-- delete template-->
                <div class="flex-[1] px-1 items-center justify-center">
                    <button class="flex" @click="deleteTemplatebyIndex(index)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </button>
                </div>

            </template>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import type { ShopConfig, ShopTemplate } from '@/types/ShopInformation';
import { type Template, type Buttons, useModalStore } from '@/stores/modal';
//import { TemplateButton } from '@/components/ModalTemplateChats/TemplateType/TemplateButton.vue'
import TemplateButton from "@/components/ModalTemplateChats/TemplateType/TemplateButton.vue"
import TemplateTextImage from '@/components/ModalTemplateChats/TemplateType/TemplateTextImage.vue'

import Swal from 'sweetalert2';

const { conversation, isFetchTemplate } = defineProps<{
    conversation: Conversation
    isFetchTemplate: boolean
}>()

import type { AttachmentForSending, } from '@/types/message'
import { useUIStore } from '@/stores/UI';
import BotioLivechat from '@/lib/BotioLivechat';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const uiStore = useUIStore()
const messageStore = useMessageStore()
const modalStore = useModalStore()
const templateList = ref<Template[]>([]);
const isDelete = ref(false);

//shopConfig.value = props.shopconfig





const deleteTemplatebyIndex = async (index: number): Promise<void> => {
    try {
        console.log(`delete template index : ${index}`)
        // Show the loading dialog

        Swal.fire({
            title: 'Deleting Template',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });


        // Perform the template deletion
        isDelete.value = false
        const botioLivechat = new BotioLivechat(conversation.shopID)
        await botioLivechat.deleteTemplate(templateID)

        // remove in template virtualization
        templateList.value.splice(index, 1)
        //const idx = templateList.value.findIndex 
        console.log(`templateList : ${templateList}`)
        console.log(`templateList length : ${templateList.value.length}`)

        //await fetchNewDataTemplate()
        isDelete.value = true


        // Show the success message
        if (isDelete) {

            Swal.fire({
                icon: 'success',
                title: 'Template Deleted',
                text: 'The template has been successfully deleted.',
            });
        }
    } catch (error) {
        console.error('Error deleting template:', error);
        // Show an error message using SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete the template.',
        });
    }
}


// function send template message to livechat
const handleSendTemplate = async (index: number, platform: string) => {
    const clickedTemplate = templateList.value[index]
    //console.log(JSON.stringify(clickedTemplate.elements, null, 2))

    if (platform === 'facebook') {
        try {
            const attachmentFacebook = {
                type: 'facebook-template-generic',
                payload: {
                    fb_template_generic: clickedTemplate.elements.map((element) => ({
                        title: element.title,
                        message: element.message,
                        picture: element.picture,
                        buttons: element.buttons.map((button) => ({
                            url: button.url,
                            title: button.title,
                        })),
                    })),
                },
            };
            await messageStore.sendAttachmentMessage(conversation, attachmentFacebook);
        } catch (error) {
            // Handle the error
            console.log('Error sending attachment:', error);
        }
    } else if (platform == 'line') {
        if (clickedTemplate.type === 'Button') {
            try {
                const attachmentLineButton: AttachmentForSending = {
                    type: 'line-template-buttons',
                    payload: {
                        line_template_buttons:
                        {
                            altText: clickedTemplate.elements[0].title,
                            thumbnailImageUrl: clickedTemplate.elements[0].picture,
                            title: clickedTemplate.elements[0].title,
                            text: clickedTemplate.elements[0].message,
                            defaultAction: {
                                label: clickedTemplate.elements[0].buttons[0].title,
                                uri: clickedTemplate.elements[0].buttons[0].url
                            },
                            actions: clickedTemplate.elements[0].buttons.map((button) => ({
                                label: button.title,
                                uri: button.url
                            }))

                        }
                    },
                }
                messageStore.sendAttachmentMessage(conversation, attachmentLineButton)

            } catch (error) {
                console.log('Error sending attachment:', error);
            }
        } else if (clickedTemplate.type === 'TextImage') {
            console.log('this type not supported')
        }
    } else if (platform == 'instagram') {
        try {
            const attachmentInstagram: AttachmentForSending = {
                type: 'instagram-template-generic',
                payload: {
                    ig_template_generic: clickedTemplate.elements.map((element) => ({
                        title: element.title,
                        message: element.message,
                        picture: element.picture,
                        buttons: element.buttons.map((button) => ({
                            url: button.url,
                            title: button.title,
                        }))
                    }))
                },
            }
            messageStore.sendAttachmentMessage(conversation, attachmentInstagram)
        } catch (error) {
            console.log('Error sending attachment:', error);
        }
    }

}

</script>

<style scoped>
.background-d9-300 {
    background-color: rgba(217, 217, 217, 0.3);
}

.background-d9-250 {
    background-color: rgba(217, 217, 217, 0.25);
}

.color-d9 {
    color: rgba(217, 217, 217, 1);
}

.color-b2 {
    color: #B2B2B2;
}

.bg-ea {
    background-color: #EAEAEA;
}

.bg-ea-80 {
    background-color: #eaeaeacc;
}

.bg-blue-dark {
    background-color: #394867;
}

.bg-blue-dark-light {
    background-color: #39486788;
}

.bg-blue-dark-green-90 {
    background-color: #00aab3e5;
}

.color-dark-green {
    color: #00ABB3;
}
</style>
