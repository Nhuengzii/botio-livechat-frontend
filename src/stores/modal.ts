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
