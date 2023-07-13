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
                <p class="text-white font-medium text-base">สร้างเทมเพลตข้อความสำหรับ</p>

            </div>
        </button>
        <!-- end create chat template -->

        <!-- space -->
        <div class="flex-[5]"></div>
        <!-- space -->
    </div>
    <div class="background-d9-250 flex flex-wrap">
        <template v-if="shopconfig">
            <div v-for="template, index in templateList" :key="template.id"
                class="flex basis-auto w-96 bg-ea-80 mx-2 my-2 py-2 px-4 items-center">

                <template v-if="template.platform === conversation.platform">

                    <div class="flex flex-[10] basis-auto py-2 justify-center items-center">
                        <div class="flex justify-center items-center">
                            <p>{{ template.name }}</p>
                        </div>
                    </div>

                    <div class="flex flex-[2] basis-auto mx-1 justify-center items-center">
                        <button @click="handleSendTemplate(index, template.platform)"
                            class="flex py-2 px-1 rounded-2xl bg-blue-dark items-center justify-center">
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
        </template>

    </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import type { ShopConfig, ShopTemplate } from '@/types/ShopInformation';
import type { Template, Buttons } from '@/stores/modal';
import Swal from 'sweetalert2';

const props = defineProps<{
    conversation: Conversation
    shopconfig: ShopConfig | undefined
    isFetchTemplate: boolean
}>()

import type { AttachmentForSending, } from '@/types/message'

import { useUIStore } from '@/stores/UI';
import { useModalStore } from '@/stores/modal'
import { useLivechatStore } from '@/stores/livechat';
import { computed, reactive, ref, watch } from 'vue';

const livechatstore = useLivechatStore()
const uiStore = useUIStore()
const modalStore = useModalStore()


const templateList = ref<Template[]>([]);
const listTemplateId = ref<string[]>([]);
const isDelete = ref(false);

const updatedTemplateList = reactive<Template[]>([]);


// watch(
//     templateList,
//     (newValue, oldValue) => {
//         // Iterate over the old list and find deleted items
//         const deletedItems = oldValue.filter(
//             (oldItem) => !newValue.some((newItem) => newItem.id === oldItem.id)
//         );

//         // Remove deleted items from the updatedTemplateList
//         deletedItems.forEach((deletedItem) => {
//             const index = updatedTemplateList.findIndex(
//                 (item) => item.id === deletedItem.id
//             );
//             if (index !== -1) {
//                 updatedTemplateList.splice(index, 1);
//                 templateList.value = updatedTemplateList
//             }
//         });
//     },
//     { deep: true }
// );

// loadind shopconfig & parsePayload in showconfig-data
const loadShopConfig = computed(() => {
    return (shopConfig?: ShopConfig) => {
        if (shopConfig && !props.isFetchTemplate) {
            try {
                shopConfig.templates.forEach((template) => {
                    const existingTemplate = listTemplateId.value.find(
                        (item) => item === template.id
                    );
                    if (!existingTemplate) {
                        listTemplateId.value.push(template.id);
                        const parsedPayload = JSON.parse(template.payload);
                        const templateData: Template = {
                            id: parsedPayload.id,
                            type: parsedPayload.type,
                            platform: parsedPayload.platform,
                            name: parsedPayload.name,
                            elements: parsedPayload.elements.map((element: any) => {
                                return {
                                    title: element.title,
                                    message: element.message,
                                    picture: element.picture,
                                    buttons: element.buttons.map((button: any) => {
                                        return {
                                            id: button.id,
                                            title: button.title,
                                            url: button.url,
                                            isSave: button.isSave,
                                        };
                                    }),
                                };
                            }),
                        };
                        // template list for virtualization
                        templateList.value.push(templateData);
                    }
                });

                // Hide the SweetAlert loading dialog
                Swal.close();
            } catch (error) {
                console.error('Error loading data templates:', error);
                // Show an alert or notification indicating the error using SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load data templates',
                });
            }
        } else {
            // Show the SweetAlert loading dialog
            Swal.fire({
                title: 'Loading Template',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                },
            });
        }
    };
});

loadShopConfig.value(props.shopconfig);



watch(
    () => props.shopconfig, // Watch the shopConfig value
    (newValue, oldValue) => {
        console.log(newValue?.templates.length, oldValue?.templates.length)
        templateList.value = []
        loadShopConfig.value(newValue); // Call the loadShopConfig computed function
    }
);

const fetchDataTemplate = async () => {
    try {
        const response = {
            isFetchTemplate: false,
            shopconfig: null as unknown as ShopConfig | undefined
        };

        response.shopconfig = await livechatstore.botioLivechat?.getShopConfig();

        if (typeof response.shopconfig !== 'undefined' && response.shopconfig !== null) {
            console.log(response.shopconfig);
            response.isFetchTemplate = true;
        } else {
            throw new Error("ShopConfig is undefined");
        }

        return response;
    } catch (error) {
        console.log('error in fetchDataTemplate');
        console.error("Error occurred while loading template:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

const deleteTemplatebyIndex = async (index: number): Promise<void> => {
    try {
        const templateID = listTemplateId.value[index];
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
        await livechatstore.botioLivechat?.deleteTemplate(templateID)

        // remove in template virtualization
        templateList.value.splice(index, 1)
        console.log(`templateList length : ${templateList.value.length}`)


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
    //const indexButton = findButtonIndex()
    const clickedTemplate = templateList.value[index]
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
