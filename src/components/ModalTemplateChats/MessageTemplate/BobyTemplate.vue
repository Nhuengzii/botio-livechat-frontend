<template>
    <div class="background-d9-250 flex flex-wrap">
        <template v-for="i in 2">
            <div class="flex basis-auto w-96 bg-ea-80 mx-2 my-2 py-2 px-4 items-center">

                <div class="flex flex-[10] basis-auto  py-2 jusitfy-center items-center">
                    <div class="flex jusitfy-center items-center">
                        <p>Name Template</p>
                    </div>
                </div>

                <div class="flex flex-[2] basis-auto  mx-1 jusitfy-center items-center">
                    <button class="flex py-2 px-1 rounded-2xl bg-blue-dark items-center justify-center">
                        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-white">
                            <font-awesome-icon icon="paper-plane" style="color: #00abad;" />
                        </div>
                        <p class="text-sm font-semibold px-2 py-1 text-white">ส่งข้อความ</p>
                    </button>
                </div>

                <div class="flex-[1] px-1 items-center justify-center">
                    <button @click="uiStore.activeEditTemplateMessage" class="flex">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                    </button>
                </div>

                <div class="flex-[1] px-1 items-center justify-center">
                    <button class="flex">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </button>
                </div>

                <div class="flex-[1] px-1">
                    <button class="flex">
                        <font-awesome-icon :icon="['fas', 'chevron-down']" />
                    </button>
                </div>
            </div>
        </template>
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