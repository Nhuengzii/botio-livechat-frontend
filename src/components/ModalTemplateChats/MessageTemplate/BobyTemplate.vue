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
                <p class="text-white font-medium text-base">สร้างเทมเพลตข้อความ</p>
            </div>
        </button>
        <!-- end create chat template -->

        <!-- space -->
        <div class="flex-[5]"></div>
        <!-- space -->
    </div>
    <div class="background-d9-250 flex flex-wrap">

        <template v-for="(template, index) in modalStore.templateList">
            <div class="flex basis-auto w-96 bg-ea-80 mx-2 my-2 py-2 px-4 items-center">

                <div class="flex flex-[10] basis-auto  py-2 jusitfy-center items-center">
                    <div class="flex jusitfy-center items-center">
                        <p>{{ template.name }}</p>
                    </div>
                </div>

                <div class="flex flex-[2] basis-auto  mx-1 jusitfy-center items-center">
                    <button @click="handleSendTemplate(index, template.platform)"
                        class="flex py-2 px-1 rounded-2xl bg-blue-dark items-center justify-center">
                        <font-awesome-icon icon="paper-plane" style="color: #00abad;" />
                        <p class="text-sm font-semibold px-2 py-1 text-white">ส่งข้อความ</p>
                    </button>
                </div>

                <div class="flex-[1] px-1 items-center justify-center">
                    <button @click="uiStore.activeEditTemplateMessage" class="flex">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                    </button>
                </div>

                <div class="flex-[1] px-1 items-center justify-center">
                    <button class="flex">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </button>
                </div>

            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
const props = defineProps<{
    conversation: Conversation
}>()

import type { AttachmentForSending, FacebookTemplateGeneric } from '@/types/message'

import { useUIStore } from '@/stores/UI';
import { useModalStore } from '@/stores/modal'
import { useLivechatStore } from '@/stores/livechat';


const livechatstore = useLivechatStore()
const uiStore = useUIStore()
const modalStore = useModalStore()



const handleSendTemplate = async (index: number, platform: string) => {
    const clickedTemplate = modalStore.templateList[index]
    // uploadImage
    const fileUpload = clickedTemplate.elements.picture
    // const image_url:string | undefined = await livechatstore.botioLivechat?.uploadImage(fileUpload)
    const image_url: string | undefined = await livechatstore.botioLivechat?.uploadImage(fileUpload);
    // send Template
    const attachment: AttachmentForSending = {
        type: 'fb-template-generic',
        payload: {
            fb_template_generic: [
                {
                    title: clickedTemplate.elements.title,
                    message: clickedTemplate.elements.text,
                    picture: image_url || "",
                    buttons: [],
                    default_action: {
                        url: ""
                    }
                }
            ]
        },

    }
    livechatstore.sendAttachmentMessage(props.conversation, attachment)
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
