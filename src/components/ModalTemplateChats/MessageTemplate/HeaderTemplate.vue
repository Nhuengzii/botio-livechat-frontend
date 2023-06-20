<template>
    <div class="flex flex-col">
        <header class="flex justify-between items-center" id="headerModal">
            <div class="bg-blue-dark py-4 px-12">
                <h3 class="text-white text-lg font-semibold">เทมเพลตข้อความ</h3>
            </div>
        </header>

        <!-- search & create chat template-->
        <div class="py-10 flex items-center">

            <!-- search chat template -->
            <div class="flex-[8] basis-auto bg-ea py-4 mr-3 rounded-2xl">
                <p class="px-8 color-d9">ค้นหาด้วย ชื่อ หรือรายละเอียดข้อความ</p>
            </div>

            <!-- create chat template -->
            <button @click="uiStore.activeCreateTemplateMessage"
                class="flex flex-[1] basis-auto bg-[#00ABB3] py-2 px-4 justify-center items-center rounded-2xl">
                    <font-awesome-icon :icon="['fas', 'circle-plus']" size="2xl"/>
                    <div class="rounded-2xl px-2 py-1">
                        <p class="text-white font-medium text-base">สร้างเทมเพลตข้อความ</p>
                    </div>
            </button>
            <!-- end create chat template -->

            <!-- space -->
            <div class="flex-[5]"></div>
            <!-- space -->
        </div>
        <!-- end search & create chat template-->
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