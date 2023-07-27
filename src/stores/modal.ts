import { defineStore } from "pinia";
import BotioLivechat from "@/lib/BotioLivechat";
import type { ShopTemplate } from "@/types/ShopInformation";
import { useShopStore } from "./shop";
import Swal from "sweetalert2";

interface ModalState {
    name: string;
    selectedTemplate: string;
    selectedFileImage: File;
    imagePreview: string;
    textUserInput: string;
    titleUserInput: string;
    platform: string;
    button: {
        title: string;
        url: string;
    };

    buttonList: Button[];
    templateList: Template[];
    isShowButtonCreate: boolean;
    amountButton: number;
    isSaveButton: boolean;
    isAddButton: boolean;
    templateListRaw: ShopTemplate[];
    listTemplateId: string[];
    isFetchingTemplate: boolean;
}

type Button = {
    id: number;
    title: string;
    url: string;
    isSave: boolean;
};

type Buttons = {
    id: number;
    title: string;
    url: string;
};

type Template = {
    id: string;
    type: string;
    platform: string;
    name: string;
    elements: {
        title: string;
        message: string;
        picture: string;
        buttons: Buttons[];
    }[];
};

export const useModalStore = defineStore("modal", {
    state: (): ModalState => ({
        name: "",
        selectedTemplate: "",
        selectedFileImage: {} as File,
        imagePreview: "",
        textUserInput: "",
        titleUserInput: "",
        platform: "",
        button: {
            title: "",
            url: "",
        },
        buttonList: [],
        templateList: [],
        isShowButtonCreate: false,
        amountButton: 1,
        isSaveButton: false,
        isAddButton: false,
        templateListRaw: [],
        listTemplateId: [],
        isFetchingTemplate: false,
    }),
    getters: {
        getTemplates: (state) => {
            try {
                const convertTemplates: Template[] = [];
                const templates = state.templateListRaw;
                templates.forEach((template) => {
                    const parsedPayload = JSON.parse(template.payload);
                    //console.log(state.platform);
                    if (parsedPayload.platform === state.platform) {
                        const templateData: Template = {
                            id: template.templateID,
                            type: parsedPayload.type,
                            platform: parsedPayload.platform,
                            name: parsedPayload.name,
                            elements: [],
                        };

                        if (Array.isArray(parsedPayload.elements)) {
                            templateData.elements = parsedPayload.elements.map(
                                (element: any) => {
                                    return {
                                        title: element.title,
                                        message: element.message,
                                        picture: element.picture,
                                        buttons: Array.isArray(element.buttons)
                                            ? element.buttons.map((button: any) => {
                                                return {
                                                    id: button.id,
                                                    title: button.title,
                                                    url: button.url,
                                                    isSave: button.isSave,
                                                };
                                            })
                                            : [],
                                    };
                                }
                            );
                        }

                        convertTemplates.push(templateData);
                    }
                });
                return convertTemplates;
            } catch (error) {
                console.error("Error in convertTemplates getter:", error);
                return [];
            }
        },
    },

    actions: {
        // fetch new templates if has add or delete template
        async updatedDataTemplate() {
            try {
                const shopStore = useShopStore();
                const botioLivechat = new BotioLivechat(shopStore.shop_id);

                const loadingDelay = 100; // Adjust the delay time as needed
                await new Promise((resolve) => setTimeout(resolve, loadingDelay));
                const templateRaw = await botioLivechat.listTemplates();
                this.templateListRaw.splice(0, this.templateListRaw.length);
                this.templateListRaw.push(...templateRaw);

            } catch (error) {
                console.log("error in fetchDataTemplate");
                console.error("Error occurred while loading template:", error);
                throw error; // Rethrow the error to propagate it to the caller
            }
        },
        async deleteTemplatebyID(id: string) {
            console.log(this.templateListRaw)
            const idx = this.templateListRaw.findIndex((template) => {
                return template.templateID === id
            })
            if (idx === -1){
                console.log("ssdsadsad")
                return;
            }
            try {
                // Perform the template deletion
                const botioLivechat = new BotioLivechat(useShopStore().shop_id)
                await botioLivechat.deleteTemplate(id)
                //await modalStore.updatedDataTemplate();

                // remove in template virtualization
                this.templateListRaw.splice(idx, 1)
                console.log(`getTtmplates: ${this.getTemplates.length}`)
                // Show the success message
            } catch (error) {
                console.error('Error deleting template:', error);
                // Show an error message using SweetAlert2
            }
        },

        async fetchDataTemplates() {
            try {
                // Swal.showLoading();
                
                const shopStore = useShopStore();
                const botioLivechat = new BotioLivechat(shopStore.shop_id);
                const loadingDelay = 400; // Adjust the delay time as needed
                await new Promise((resolve) => setTimeout(resolve, loadingDelay));
                const templateRaw = await botioLivechat.listTemplates();
                
                this.templateListRaw.splice(0, this.templateListRaw.length);
                this.templateListRaw.push(...templateRaw);

            } catch (error) {
                console.log("error in fetchDataTemplate");
                console.error("Error occurred while loading template:", error);
            }
        },
        // what select template ? button or TextImage
        selectTemplate(template: string) {
            this.selectedTemplate = template;
        },

        // reset state value
        reset() {
            this.imagePreview = "";
            this.textUserInput = "";
            this.titleUserInput = "";
            this.selectedFileImage = {} as File;
            this.button.title = "";
            this.button.url = "";
            this.name = "";
            this.buttonList = [];
            this.selectedTemplate = "";
            this.isShowButtonCreate = false;
            this.amountButton = 1;
        },
    },

});

export type { Template, Buttons };

