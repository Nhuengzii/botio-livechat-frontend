import { defineStore } from "pinia";

type ModalState = {
    name: string;
    selectedTemplate: string;
    selectedFile: File;
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
};

type Button = {
    id: number
    title: string;
    url: string;
}

type GenericForm = {
    image_url: string,
    title: string,
    text: string,
}

type ButtonForm = {
    image_url: string;
    title: string;
    text: string;
    buttonList: Button[];
}

type Template = {
    id: number
    platform: string
    name: string;
    elements: GenericForm | ButtonForm
}

export const useModalStore = defineStore("modal", {
    state: (): ModalState => ({
        name: "",
        selectedTemplate: "",
        selectedFile: "",
        imagePreview: "",
        textUserInput: "",
        titleUserInput: "",
        platform: "",
        button: {
            title: "",
            url: "",
        },
        buttonList: [],
        templateList: []
    }),
    actions: {
        selectTemplate(template: string) {
            this.selectedTemplate = template;
        },

        actionAddButton() {
            if (this.buttonList.length >= 3) {
                return;
            }
            const newButton: Button = {
                title: this.button.title,
                url: this.button.url,
                id: Date.now()
            };
            this.buttonList.push(newButton);
            this.button.url = "",
                this.button.title = ""
        },
        clickToAddButton() {
            if (this.buttonList.length >= 3) {
                return;
            }

        },
        actionsCreateTemplate() {
            const template: Template = {
                id: this.templateList.length + 1,
                platform: 'line',
                name: this.name,
                elements: {} as GenericForm | ButtonForm
                ,
            };

            if (this.selectedTemplate === 'ImageText') {
                // for ImageText template type, set elemets as GenericForm
                const genericForm: GenericForm = {
                    image_url: this.imagePreview,
                    title: this.titleUserInput,
                    text: this.textUserInput
                };
                template.elements = genericForm


            } else if (this.selectedTemplate === "Button") {
                // for Button template type, set elements as ButtonForm
                const buttonForm: ButtonForm = {
                    image_url: this.imagePreview,
                    title: this.titleUserInput,
                    text: this.textUserInput,
                    buttonList: this.buttonList,
                }
                template.elements = buttonForm
            }


            this.templateList.push(template)
            this.reset();
        },
        showButtonCreateTemplate() {
            if (this.selectedTemplate === 'ImageText') {
                return (
                    this.imagePreview !== "" &&
                    this.titleUserInput !== "" &&
                    this.textUserInput !== ""
                )
            } else if (this.selectedTemplate === 'Button') {
                return (
                    this.imagePreview !== "" &&
                    this.titleUserInput !== "" &&
                    this.textUserInput !== "" &&
                    this.button.url !== "" &&
                    this.button.title !== ""
                )
            }
        },

        reset() {
            this.imagePreview = "";
            this.textUserInput = "";
            this.titleUserInput = "";
            this.button.title = "";
            this.button.url = "";
            this.name = "";
            this.platform = "";
            this.buttonList = [];
        },
    },
});
