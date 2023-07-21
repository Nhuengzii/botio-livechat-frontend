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
                    console.log(state.platform);
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
                console.log(convertTemplates);
                
                return convertTemplates;
            } catch (error) {
                console.error("Error in convertTemplates getter:", error);
                

                
                
                return [];
            }
        },
    },

    actions: {
        // fetch templates in shopconfig
        async fetchDataTemplates() {
            try {
                // Swal.showLoading();
                Swal.fire({
                    title: 'กำลังโหลดข้อมูลเทมเพลต',
                    html: '<div class="d-flex justify-content-center align-items-center"><img src="loading-icon.png" alt="Loading Icon" class="mr-2"/></div>',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    },
                });
                const shopStore = useShopStore();
                const botioLivechat = new BotioLivechat(shopStore.shop_id);

                const loadingDelay = 400; // Adjust the delay time as needed
                await new Promise((resolve) => setTimeout(resolve, loadingDelay));

                const templateRaw = await botioLivechat.listTemplates();
                //Swal.hideLoading();
                Swal.close();

                Swal.fire({
                    icon: 'success',
                    title: 'โหลดเทมเพลตสำเร็จ',
                    text: 'Templates have been fetched successfully!',
                    timer: 1000,
                    timerProgressBar: true,
                });

                this.templateListRaw.splice(0, this.templateListRaw.length);
                this.templateListRaw.push(...templateRaw);
                console.log(templateRaw);
                //return templatesRaw;
            } catch (error) {
                console.log("error in fetchDataTemplate");
                console.error("Error occurred while loading template:", error);
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'เกิดข้อผิดพลาดขณะโหลดเทมเพลต โปรดลองอีกครั้ง',
                });
                throw error; // Rethrow the error to propagate it to the caller
            }
        },

        // what select template ? button or TextImage
        selectTemplate(template: string) {
            this.selectedTemplate = template;
        },

        // save value button in list
        actionSaveButton() {
            if (this.buttonList.length >= 3) {
                return;
            }
            const newButton = {
                title: this.button.title,
                url: this.button.url,
                id: Date.now(),
                isSave: true,
            };

            // Check if the button already exists in the buttonList
            this.isSaveButton = true;
            this.buttonList.push(newButton);
            console.log("Button saved:", newButton);
            this.button.url = "";
            this.button.title = "";
            // increase num button
            this.amountButton++;
            console.log(`isSaveButton: ${this.isSaveButton}`);
        },
        actionDeleteButton(index: number): void {
            if (this.amountButton >= 0) {
                this.buttonList.slice(index, 1);
                this.amountButton--;
            }
            console.log("delete button");
            console.log(JSON.stringify(this.buttonList, null, 2));
        },

        clickToAddButton() {
            if (this.buttonList.length >= 3 || this.amountButton >= 3) {
                this.isAddButton = false;
                return;
            }

            this.amountButton++;
            this.isAddButton = true;
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
            this.platform = "";
            this.buttonList = [];
            this.selectedTemplate = "";
            this.isShowButtonCreate = false;
            this.amountButton = 1;
        },
    },
    
});

export type { Template, Buttons };
function fetchDataTemplate() {
    throw new Error("Function not implemented.");
}
