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
            console.log(this.templateList)
            console.log(this.titleUserInput)
            console.log(this.imagePreview)
        },
        showButtonCreateTemplate() {
            if (this.selectedTemplate === "TextImage"){
                if (this.textUserInput !== "" && this.titleUserInput !== "" && this.imagePreview !== "") {
                    return true
                } else {
                    return false
                }

            } else if (this.selectedTemplate === "Button"){
                if (this.textUserInput !== "" && this.titleUserInput !== "" && this.imagePreview !== "") {
                    if (this.button.title !== "" && this.button.url !== "") {
                        return true
                    } else {
                        return false
                    }
                }
            }
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
