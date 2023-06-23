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
            ['facebook', { unreadConversations: 0, allConversations: 0 }],
            ['instagram', { unreadConversations: 0, allConversations: 0 }],
            ['line', { unreadConversations: 0, allConversations: 0 }],
            ['all', { unreadConversations: 0, allConversations: 0 }],
        ]),
        is_activeTemplateMessage: false,
        is_typing: false,
        is_createTemplateMessage: false,
        is_editTemplateMessage: false,
        is_changePage: false,
        
    }),
    getters: {
        pageInformation(state) {
            return (platform: string) => {
                if (platform === 'all') {
                    return {
                        unreadConversations: state.availablesPlatforms.get('facebook')!.unreadConversations +
                            state.availablesPlatforms.get('instagram')!.unreadConversations +
                            state.availablesPlatforms.get('line')!.unreadConversations,
                        allConversations: state.availablesPlatforms.get('facebook')!.allConversations +
                            state.availablesPlatforms.get('instagram')!.allConversations +
                            state.availablesPlatforms.get('line')!.allConversations
                    }
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
