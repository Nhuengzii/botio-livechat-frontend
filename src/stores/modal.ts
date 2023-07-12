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

    buttonList: Button[];
    templateList: Template[];
    isShowButtonCreate: boolean;
    amountButton: number;
    isSaveButton: boolean;
    isAddButton: boolean;
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
        buttons: {
            id: number
            title: string
            url: string
        }[]
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
        buttonList: [],
        templateList: [],
        isShowButtonCreate: false,
        amountButton: 1,
        isSaveButton: false,
        isAddButton: false

    }),
    actions: {
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
                isSave: true

            };

            // Check if the button already exists in the buttonList
            this.isSaveButton = true;
            this.buttonList.push(newButton);
            console.log("Button saved:", newButton);
            this.button.url = "";
            this.button.title = "";
            // increase num button
            this.amountButton++;
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
                this.isAddButton = false;
                return;
            }

            this.amountButton++;
            this.isAddButton = true;
        },
        // not use now
        findTemplateWithId(templateId: number) {
            const clickedTemplate = this.templateList.find(template => template.id === templateId)
            return clickedTemplate
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

export type { Template }
