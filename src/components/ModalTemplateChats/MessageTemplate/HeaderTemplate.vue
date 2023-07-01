<template>
    <div class="flex flex-col">
        <header class="flex justify-between items-center" id="headerModal">
            <div class="bg-blue-dark py-4 px-12">
                <h3 class="text-white text-lg font-semibold">เทมเพลตข้อความ</h3>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
const uiStore = useUIStore()
</script>

<style scoped>
.background-d9-300 {
    background-color: rgba(217, 217, 217, 0.3);
}

.background-d9-250 {
    background-color: rgba(217, 217, 217, 0.25);
}

.color-d9 {
    color: rgba(217, 217, 217, 1);
}

.color-b2 {
    color: #B2B2B2;
}

.bg-ea {
    background-color: #EAEAEA;
}

.bg-ea-80 {
    background-color: #eaeaeacc;
}

.bg-blue-dark {
    background-color: #394867;
}

.bg-blue-dark-light {
    background-color: #39486788;
}

.bg-blue-dark-green-90 {
    background-color: #00aab3e5;
}

.color-dark-green {
    color: #00ABB3;
}
</style>