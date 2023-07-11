import { defineStore } from "pinia";
import { BotioLivechat } from "@/lib/BotioLivechat";

type ModalState = {
    name: string;
    selectedTemplate: string;
    selectedFileImage: File;
    imagePreview: string;
    textUserInput: string;
    titleUserInput: string;
    platform: string
    button: {
        title: string;
        url: string;
    };
    buttonList: Button[];
    templateList: Template[];
    isShowButtonCreate: boolean;
    amountButton: number;
};


type Button = {
    id: number
    title: string;
    url: string;
}


type Template = {
    id: number
    type: string
    platform: string
    name: string;
    elements: {
        title: string;
        message: string;
        picture: string;
        buttons: Button[]
    }[]
}

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
        
    }),
    actions: {
        selectTemplate(template: string) {
            this.selectedTemplate = template;
        },

        actionSaveButton() {
            if (this.buttonList.length >= 3) {
                return;
            }
            const newButton: Button = {
                title: this.button.title,
                url: this.button.url,
                id: Date.now()
            };
            this.buttonList.push(newButton);
            console.log(JSON.stringify(this.buttonList, null, 2));
            this.button.url = "",
            this.button.title = ""
        },
        clickToAddButton() {
            if (this.buttonList.length >= 3 && this.amountButton >= 3) {
                return;
            } else {
                this.amountButton += 1;
            } 
        },
        async actionsCreateTemplate(image_url: string) {
            // let elmentsList = [],
            
            const template: Template = {
                id: Date.now(),
                type: this.selectedTemplate,
                platform: this.platform,
                name: this.name,
                elements: [
                    {
                        title: this.titleUserInput,
                        message: this.textUserInput,
                        picture: image_url,
                        buttons: this.buttonList.map((button) => ({
                            id: button.id,
                            title: button.title,
                            url: button.url,
                        }))
                    }
                ]
                
            };
            this.templateList.push(template)
            this.reset();
        },

        // not use now
        findTemplateWithId(templateId: number) {
            const clickedTemplate = this.templateList.find(template => template.id === templateId)
            return clickedTemplate
        },

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

export type { Template }
