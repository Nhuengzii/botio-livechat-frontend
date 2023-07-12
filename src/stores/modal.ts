import { defineStore } from "pinia";


type ModalState = {
    name: string;
    selectedTemplate: string;
    selectedFileImage: File;
    imagePreview: string;
    textUserInput: string;
    titleUserInput: string;
    platform: string
    button: {
        title: string
        url: string
    }
    button1: Button,
    button2?: Button,
    button3?: Button
    buttonList: Button[];
    templateList: Template[];
    isShowButtonCreate: boolean;
    amountButton: number;
    isSaveButton: boolean;
};


type Button = {

    id: number
    title: string;
    url: string;
    isSave: boolean

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
            url: ""
        },
        button1: {} as Button,
        button2: {} as Button,
        button3: {} as Button,
        buttonList: [],
        templateList: [],
        isShowButtonCreate: false,
        amountButton: 1,
        isSaveButton: false

    }),
    actions: {
        selectTemplate(template: string) {
            this.selectedTemplate = template;
        },

        actionSaveButton() {
            if (this.buttonList.length >= 3) {
                return;
            }
            const newButton = {
                title: this.button.title,
                url: this.button.url,
                id: Date.now(),
                isSave: true

            };

            // Check if the button already exists in the buttonList
            this.isSaveButton = true;
            this.buttonList.push(newButton);
            console.log("Button saved:", newButton);
            this.button.url = "";
            this.button.title = "";
            console.log(`isSaveButton: ${this.isSaveButton}`)
        },
        actionDeleteButton(index: number): void {
            if (this.amountButton >= 0) {

                this.buttonList.slice(index, 1)
                this.amountButton--;
            }
            console.log("delete button")
            console.log(JSON.stringify(this.buttonList, null, 2));
        },


        clickToAddButton() {
            if (this.buttonList.length >= 3 || this.amountButton >= 3) {
                return;
            }

            this.amountButton++;
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
