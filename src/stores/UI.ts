import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('toggle', () => {
    const is_expanded = ref(false)
    const ToggleMenu = () => {
        is_expanded.value = !is_expanded.value
    }
    const is_activeButton = ref(false)

    const activeButtonNav = () => {
        is_activeButton.value = !is_activeButton.value
    }


    return { is_expanded, ToggleMenu, is_activeButton, activeButtonNav }
})