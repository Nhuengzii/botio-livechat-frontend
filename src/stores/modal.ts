import { defineStore } from "pinia";
import { useLivechatStore } from '@/stores/livechat';

const livechatstore = useLivechatStore()

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
};


type Button = {
    id: number
    title: string;
    url: string;
}

// type GenericForm = {
//     pictureFile: File,
//     title: string,
//     text: string,                                                           
// }

// type ButtonForm = {
//     pictureFile: File;
//     title: string;
//     text: string;
//     buttonList: Button[];
// }

type Template = {
    id: number
    type: string
    platform: string
    name: string;
    // elements: GenericForm | ButtonForm
    elements: {
        title: string;
        message: string;
        picture: string | undefined;
        buttons: Button[]


    }
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
        async actionsCreateTemplate() {
            console.log("pre uploadImage")
            const image_url = await livechatstore.botioLivechat?.uploadImage(this.selectedFileImage);

            const template: Template = {
                id: this.templateList.length + 1,
                type: this.selectedTemplate,
                platform: this.platform,
                name: this.name,
                elements: {
                    title: this.titleUserInput,
                    message: this.textUserInput,
                    picture: image_url,
                    buttons: []
                    
                }
                ,
            };
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
        findTemplateWithId(templateId: number) {
            const clickedTemplate = this.templateList.find(template => template.id === templateId)
            return clickedTemplate
        },

        reset() {
            this.imagePreview = "";
            this.textUserInput = "";
            this.titleUserInput = "";
            this.selectedFileImage = new File([], "");
            this.button.title = "";
            this.button.url = "";
            this.name = "";
            this.platform = "";
            this.buttonList = [];
        },
    },
});
