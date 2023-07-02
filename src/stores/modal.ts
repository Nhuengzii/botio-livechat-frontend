import { defineStore } from "pinia";

type ModalState = {
    name: string;
    selectedTemplate: string;
    imagePreview: string;
    textUserInput: string;
    titleUserInput: string;
    button: {
        title: string;
        url: string;
    };
    buttonList: number[];
    templateList: Template[];
};

type ButtonTemplate = {
    elements: {
        title: string;
        text: String;
        button: {
            title: string;
            url: string;
        };
    };
};

type TextImageTemplate = {
    elements: {
        title: string;
        text: string;
        image_url: string;
    };
};

type Template = {
    elements: {
        name: string
        type: string;
        title: string;
        text: string;
        image_url: string;
        button?: {
            title: string;
            url: string
        }
    }
}

export const useModalStore = defineStore("modal", {
    state: (): ModalState => ({
        name: "",
        selectedTemplate: "",
        imagePreview: "",
        textUserInput: "",
        titleUserInput: "",
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
        handleFileSelect(event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0];
            //console.log(file)
            if (file) {
                // Read the selected file and generate a preview URL
                const reader = new FileReader();
                reader.onload = () => {
                    this.imagePreview = reader.result as string;
                };
                reader.readAsDataURL(file);
                console.log(this.imagePreview);
            }
        },
        actionAddButton() {

        },
        actionsCreateTemplate() {
            const template: Template = {
                elements: {
                    name: this.name,
                    type: this.selectedTemplate,
                    title: this.titleUserInput,
                    text: this.textUserInput,
                    image_url: this.imagePreview,
                },
            };

            this.templateList.push(template)
            this.reset();

            console.log(this.templateList)
            console.log(this.titleUserInput)
            console.log(this.imagePreview)
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
        },
    },
});
