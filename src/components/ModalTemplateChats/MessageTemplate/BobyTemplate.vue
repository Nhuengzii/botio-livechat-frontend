<template>
    <div class="flex flex-wrap">
        <div v-for="template, index in  modalStoreRef.getTemplates.value" :key="template.id"
            class="flex flex-col w-72 rounded-xl mx-2 my-2  items-center justify-items-center">

            <template v-if="template && template.elements && template.elements[0]">
                <template v-if="template.platform === conversation.platform">
                    <template v-if="template.type === 'Button'">
                        <div class="my-4 px-4 bg-gray-200">
                            <p class="justify-self-start text-center p-2 text-base font-medium bg-gray-200 w-full">{{
                                template.name }}</p>
                            <div class="bg-white border-2 rounded-lg">
                                <div class="flex items-center justify-centerw-56 h-44 bg-blue-700 rounded-t-lg">
                                    <img :src="template.elements[0].picture" alt=""
                                        class="object-cover w-56 h-44 overflow-hidden"
                                        v-if="template.elements[0].picture">
                                    <p class="text-white" v-else> error cannot load image</p>
                                </div>
                                <div class="border-b-2 flex flex-col w-56 items-start px-3">
                                    <h1 class="break-all  py-2 max-h-20  font-semibold text-ellipsis"
                                        v-if="template.elements[0].title">
                                        {{ template.elements[0].title }}
                                    </h1>

                                    <p class="break-all  pb-4 max-h-32 text-ellipsis overflow-hidden"
                                        v-if="template.elements[0].message">
                                        {{ template.elements[0].message }}
                                    </p>
                                </div>
                                <div v-for="( button, index )  in template.elements[0].buttons" :key="button.id"
                                    class="flex flex-col">
                                    <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2 cursor-default">{{
                                        button.title
                                    }}</button>
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-full pt-4">
                                <div class="items-center justify-center">
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
                            </div>
                            <div class="flex px-2 pb-4 items-center justify-end w-full">
                                <button class="flex" @click="handleDeletetemplate(template.id)">
                                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                                </button>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="template.type === 'TextImage'">
                        <div class="my-4 px-4 justify-self-end bg-gray-200">
                            <p class="justify-self-start text-center p-2 text-base font-medium w-full">{{ template.name }}
                            </p>
                            <div class="bg-white  border-2 rounded-lg">
                                <div class="flex items-center justify-center w-56 h-44 bg-blue-700 rounded-t-lg">
                                    <img :src="template.elements[0].picture" alt=""
                                        class="object-cover h-full w-full rounded-t-lg overflow-hidden">
                                </div>
                                <div class="border-b-2 flex flex-col items-start w-56">
                                    <h1 class="break-all px-3 py-2 max-h-20  font-semibold text-ellipsis">
                                        {{ template.elements[0].title }}
                                    </h1>
                                    <p class="break-all px-3 pb-4 min-h-32 max-h-48 text-ellipsis overflow-hidden">
                                        {{ template.elements[0].message }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-full pt-4">
                                <div class="items-center justify-center">
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
                            </div>
                            <div class="flex px-2 pb-4 items-center justify-end w-full">
                                <button class="flex" @click="handleDeletetemplate(template.id)">
                                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                                </button>
                            </div>
                        </div>

                    </template>

                </template>
            </template>
            <template v-else>
                <!-- Handle the case when template or its elements are undefined -->
                <p>Template data is not available or has an incorrect format.</p>
                <div class="flex px-2 pb-4 items-center justify-end w-full">
                    <button class="flex" @click="">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import { useModalStore } from '@/stores/modal';
import Swal from 'sweetalert2';

const { conversation } = defineProps<{
    conversation: Conversation
}>()

import type { AttachmentForSending, } from '@/types/message'
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
const messageStore = useMessageStore()
const modalStore = useModalStore()
const modalStoreRef = storeToRefs(modalStore)

const handleDeletetemplate = async (id: string) => {
    Swal.fire({
        title: `กำลังลบเทมเพลต`,
        //html: '<div class="d-flex justify-content-center align-items-center"><img src="loading-icon.png" alt="Loading Icon" class="mr-2"/></div>',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    });
    await modalStore.deleteTemplatebyID(id)
    Swal.close();
    Swal.fire({
        icon: 'success',
        title: 'ลบเทมเพลตสำเร็จ',
        text: 'ลบเทมเพลตสำเร็จ',
        timer: 1000,
        timerProgressBar: true,
    });
}




// function send template message to livechat
const handleSendTemplate = async (index: number, platform: string) => {
    Swal.fire({
        title: 'กำลังส่งเทมเพลต',
        //html: '<div class="d-flex justify-content-center align-items-center"><img src="loading-icon.png" alt="Loading Icon" class="mr-2"/></div>',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    });
    const clickedTemplate = modalStore.getTemplates[index]
    if (platform === 'facebook') {
        try {
            const attachmentFacebook: AttachmentForSending = {
                type: 'facebookTemplateGeneric',
                payload: {
                    facebookTemplateGeneric: clickedTemplate.elements.map((element) => ({
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
                    type: 'lineTemplateButtons',
                    payload: {
                        lineTemplateButtons:
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
                await messageStore.sendAttachmentMessage(conversation, attachmentLineButton)

            } catch (error) {
                console.log('Error sending attachment:', error);
            }
        } else if (clickedTemplate.type === 'TextImage') {
            console.log('this type not supported')
        }
    } else if (platform == 'instagram') {
        try {
            const attachmentInstagram: AttachmentForSending = {
                type: 'instagramTemplateGeneric',
                payload: {
                    instagramTemplateGeneric: clickedTemplate.elements.map((element) => ({
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
            await messageStore.sendAttachmentMessage(conversation, attachmentInstagram)
        } catch (error) {
            console.log('Error sending attachment:', error);
        }
    }
    Swal.close();
    Swal.fire({
        icon: 'success',
        title: 'สร้างเทมเพลตสำเร็จ',
        text: 'สร้างเทมเพลตสำเร็จ',
        timer: 1000,
        timerProgressBar: true,
    });

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
