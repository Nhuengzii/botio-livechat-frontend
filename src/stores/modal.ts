import { defineStore } from "pinia";

type ModalState = {
    name: string;
    selectedTemplate: string;
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
    title: string;
    url: string;
}

type Template = {
    id: number
    platform: string
    name: string;
    elements: {
        type: string;
        title: string;
        text: string;
        image_url: string;
        button?: Button
    }
}

export const useModalStore = defineStore("modal", {
    state: (): ModalState => ({
        name: "",
        selectedTemplate: "",
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
            const newButton: Button = {
                title: "",
                url: "",
            };
            this.buttonList.push(newButton);
        },
        actionsCreateTemplate() {
            const template: Template = {
                id: this.templateList.length + 1,
                platform: 'line',
                name: this.name,
                elements: {
                    type: this.selectedTemplate,
                    title: this.titleUserInput,
                    text: this.textUserInput,
                    image_url: this.imagePreview,
                    button: {
                        title: this.button.title,
                        url: this.button.url,
                    }
                },
            };

            this.templateList.push(template)
            this.reset();
        },
        showButtonCreateTemplate() {
            switch (this.selectedTemplate) {
                case "TextImage":
                    return this.textUserInput !== "" && this.titleUserInput !== "" && this.imagePreview !== "";

                case "Button":
                    if (this.textUserInput !== "" && this.titleUserInput !== "" && this.imagePreview !== "") {
                        if (this.button && this.button.title !== "" && this.button.url !== "") {
                            return true;
                        }
                    }
                    break;
            }

            return false;
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
