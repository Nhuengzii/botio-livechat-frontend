import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        is_expanded: false,
        is_activeButton: false,
        is_activeConversation: false,
        is_read: false,
        conversationsThreadMode: "normal",
        is_activeTemplateMessage: false,
        is_typing: false,
        is_createTemplateMessage: false,
        is_editTemplateMessage: false,
        is_changePage: false,
        is_selectTemplate: false,
        is_finishCreateTemplate: false,
        showEditModal: false,
        is_window_focus: true

    }),
    getters: {
    },
    actions: {
        ToggleMenu() {
            this.is_expanded = !this.is_expanded
        },
        activeButtonNav() {
            this.is_activeButton = !this.is_activeButton
        },
        activeConversation() {
            this.is_activeConversation = !this.is_activeConversation
        },
        activeTemplateMessage() {
            this.is_activeTemplateMessage = true
        },
        activeChagePage() {
            this.is_changePage = !this.is_changePage
            this.is_editTemplateMessage = false
            this.is_createTemplateMessage = false
        },
        activeCreateTemplateMessage() {
            this.is_createTemplateMessage = !this.is_createTemplateMessage
            this.is_editTemplateMessage = false

        },
        activeEditTemplateMessage() {
            this.is_editTemplateMessage = !this.is_editTemplateMessage
            this.is_createTemplateMessage = false
        },

        closeTemplateMessage() {
            this.is_editTemplateMessage = false
            this.is_createTemplateMessage = false
            this.is_activeTemplateMessage = false
        },
        activeSelectTemplate() {
            this.is_selectTemplate = true
        },
        finishCreateTemplate() {
            this.is_editTemplateMessage = false
            this.is_createTemplateMessage = false
            this.is_activeTemplateMessage = true

        },
        openEditModal() {
            this.showEditModal = true;
        },

        closeEditModal() {
            this.showEditModal = false;
        },
        onClickTemplate(link_url: string) {
            window.open(link_url)
        }
    }
})
