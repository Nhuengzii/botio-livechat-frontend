import { defineStore } from "pinia";

type ModalState = {
    selectedTemplate: string;
    imagePreview: string;
    textUserInput: string;
    titleUserInput: string;
    button: {
        title: string;
        url: string;
    };
    buttonList: number[];
    templateList: TextImageTemplate[];
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

export const useModalStore = defineStore("modal", {
    state: (): ModalState => ({
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
        actionsCreateTemplate() {
            if (
                this.selectedTemplate === "TextImage" &&
                this.textUserInput &&
                this.titleUserInput &&
                this.imagePreview
            ) {
                const template: TextImageTemplate = {
                    elements: {
                        title: this.titleUserInput,
                        text: this.textUserInput,
                        image_url: this.imagePreview,
                    },
                };

                this.templateList.push(template)
                this.reset();
            }
        },
        showButtonCreateTemplate() {
            if (this.textUserInput && this.titleUserInput && this.imagePreview) {
                if (this.selectedTemplate === "TextImage") {
                    return true;
                } else if (this.selectedTemplate === "Button") {
                    if (this.button.title && this.button.url) {
                        return true;
                    }
                }
            }
        },
        reset() {
            this.imagePreview = "";
            this.imagePreview = "";
            this.textUserInput = "";
            this.titleUserInput = "";
            this.button.title = "";
            this.button.url = "";
        },
    },
});
