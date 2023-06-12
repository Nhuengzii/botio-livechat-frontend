import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        is_expanded: false,
        is_activeButton: false,
        is_activeConversation: false,
        is_read: false,
        currentFocusPlatform: 'facebook',
        availablesPlatforms: new Map<string, { unread: number }>([
            ['facebook', { unread: 33 }],
            ['instagram', { unread: 0 }],
            ['line', { unread: 2 }],
            ['centralized', { unread: 35 }],
        ]),
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
        switchPlatform(platform: string) {
            this.currentFocusPlatform = platform
        }

    }
})
