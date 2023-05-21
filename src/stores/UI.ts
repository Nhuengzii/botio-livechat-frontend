import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        is_expanded: false,
        is_activeButton: false,
    }),
    actions: {
        ToggleMenu() {
            this.is_expanded = !this.is_expanded
        },
        activeButtonNav() {
            this.is_activeButton = !this.is_activeButton
        }
    }
})
