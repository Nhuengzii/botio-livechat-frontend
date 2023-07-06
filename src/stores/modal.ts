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
                elements: {} as GenericForm | ButtonForm
                ,
            };

            if (this.selectedTemplate === "ImageText") {
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
