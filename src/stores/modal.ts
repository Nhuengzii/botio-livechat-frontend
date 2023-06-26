import { defineStore } from 'pinia'


export const useModalStore = defineStore('modal', {
    state: () => ({
        selectedTemplate:""
    }),
    actions: {
        selectTemplate(template:string){
            this.selectedTemplate = template
        }
    }
})
