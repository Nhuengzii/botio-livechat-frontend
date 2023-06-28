import { defineStore } from 'pinia'


export const useModalStore = defineStore('modal', {
    state: () => ({
        selectedTemplate: "",
        imagePreview: "",
        textUserInput: "",
        titleUserInput: ""
    }),
    actions: {
        selectTemplate(template: string) {
            this.selectedTemplate = template
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
                console.log(this.imagePreview)
            }
        },
        reset() {
            this.imagePreview = ""
            this.imagePreview = ""
            this.textUserInput = ""
            this.titleUserInput = ""
        }
    }
})
