import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        is_expanded: false,
        is_activeButton: false,
        is_activeConversation: false,
        is_read: false,
        conversationsThreadMode: "normal",
        availablesPlatforms: new Map<string, { unread: number }>([
            ['facebook', { unread: 0 }],
            ['instagram', { unread: 0 }],
            ['line', { unread: 0 }],
            ['all', { unread: 0 }],
        ]),
        is_activeTemplateMessage: false,
        is_typing: false,
        is_createTemplateMessage: false,
        is_editTemplateMessage: false,
        is_changePage: false
    }),
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
            this.is_activeTemplateMessage = !this.is_activeTemplateMessage
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
    }
})
