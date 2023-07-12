<template>
    <div class="py-10 flex items-center">
        <!-- search chat template -->
        <div class="flex-[8] basis-auto bg-ea py-4 mr-3 rounded-2xl">
            <p class="px-8 color-d9">ค้นหาด้วย ชื่อ หรือรายละเอียดข้อความ</p>
        </div>

        <!-- create chat template -->
        <button @click="uiStore.activeCreateTemplateMessage"
            class="flex flex-[1] basis-auto bg-[#00ABB3] py-2 px-4 justify-center items-center rounded-2xl">
            <font-awesome-icon :icon="['fas', 'circle-plus']" size="2xl" />
            <div class="rounded-2xl px-2 py-1">
                <p class="text-white font-medium text-base">สร้างเทมเพลตข้อความสำหรับ {{conversation.platform}}</p>
            </div>
        </button>
        <!-- end create chat template -->

        <!-- space -->
        <div class="flex-[5]"></div>
        <!-- space -->
    </div>
    <div class="background-d9-250 flex flex-wrap">
        
        <p>{{  }}</p>
        <template v-if="shopconfig">
            <div v-for="template, index in shopconfig.Templates" class="flex basis-auto w-96 bg-ea-80 mx-2 my-2 py-2 px-4 items-center">
                <p>11111</p>
                <!-- <div class="flex flex-[10] basis-auto  py-2 jusitfy-center items-center">
                    <div class="flex jusitfy-center items-center">
                       
                    </div>
                </div> -->

                <!-- <div class="flex flex-[2] basis-auto  mx-1 jusitfy-center items-center">
                    <button @click="handleSendTemplate(index, template.platform)"
                        class="flex py-2 px-1 rounded-2xl bg-blue-dark items-center justify-center">
                        <font-awesome-icon icon="paper-plane" style="color: #00abad;" />
                        <p class="text-sm font-semibold px-2 py-1 text-white">ส่งข้อความ</p>
                    </button>
                </div> -->

                <!-- (To Do !!!) icon click to edit template -->
                <!-- <div class="flex-[1] px-1 items-center justify-center">
                    <button @click="uiStore.activeEditTemplateMessage" class="flex">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                    </button>
                </div> -->

                <!-- (To DO !!!) icon click to delete template -->
                <!-- <div class="flex-[1] px-1 items-center justify-center">
                    <button class="flex">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </button>
                </div> -->

            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import type { ShopConfig } from '@/types/ShopInformation';
const props = defineProps<{
    conversation: Conversation
    shopconfig: ShopConfig | undefined
}>()

import type { AttachmentForSending, } from '@/types/message'

import { useUIStore } from '@/stores/UI';
import { useModalStore } from '@/stores/modal'
import { useLivechatStore } from '@/stores/livechat';

const livechatstore = useLivechatStore()
const uiStore = useUIStore()
const modalStore = useModalStore()

// function send template message to livechat
const handleSendTemplate = async (index: number, platform: string) => {
    const clickedTemplate = modalStore.templateList[index]
    console.log(JSON.stringify(clickedTemplate.elements, null, 2))

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

            await livechatstore.sendAttachmentMessage(props.conversation, attachmentFacebook);
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
                livechatstore.sendAttachmentMessage(props.conversation, attachmentLineButton)

            } catch (error) {
                console.log('Error sending attachment:', error);
                console.log('yeeeeeeeeeeeeeeeeeeeeeeee')
            }
        } else if (clickedTemplate.type === 'TextImage') {
            console.log('this type not supported')
        }
    } else if (platform == 'instagram') {
        try {
            const attachmentInstagram: AttachmentForSending = {
                type: 'instagram-template-generic',
                payload: {
                    ig_template_generic: clickedTemplate.elements.map((element) =>({
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
            livechatstore.sendAttachmentMessage(props.conversation, attachmentInstagram)
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
