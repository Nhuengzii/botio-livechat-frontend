import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PageInformation } from '@/types/pageInformation'

export const useUIStore = defineStore('ui', {
    state: () => ({
        is_expanded: false,
        is_activeButton: false,
        is_activeConversation: false,
        is_read: false,
        conversationsThreadMode: "normal",
        availablesPlatforms: new Map<string, PageInformation>([
            ['all', { unreadConversations: 0, allConversations: 0 }],
        ]),
        is_activeTemplateMessage: false,
        is_typing: false,
        is_createTemplateMessage: false,
        is_editTemplateMessage: false,
        is_changePage: false,
        is_selectTemplate: false,
        is_finishCreateTemplate: false,
        showEditModal: false,

    }),
    getters: {
        pageInformation(state) {
            return (platform: string) => {
                if (platform === 'all') {
                    const sumUnreadConversations = Array.from(state.availablesPlatforms.values()).reduce((acc, cur) => acc + cur.unreadConversations, 0)
                    const sumAllConversations = Array.from(state.availablesPlatforms.values()).reduce((acc, cur) => acc + cur.allConversations, 0)
                    return { unreadConversations: sumUnreadConversations, allConversations: sumAllConversations }
                } else {
                    return state.availablesPlatforms.get(platform)!
                }
            }
        }
    },
    actions: {
        ToggleMenu() {
            this.is_expanded = !this.is_expanded
        },
        addAvailablePlatform(platform: string, pageInformation: PageInformation) {
            this.availablesPlatforms.set(platform, pageInformation);
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
        activeSelectTemplate() {
            this.is_selectTemplate = true
        },
        finishCreateTemplate() {
            this.is_finishCreateTemplate = true

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
