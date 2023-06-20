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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>

                    </button>
                </div>

                <div class="flex-[1] px-1 items-center justify-center">
                    <button class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>

                <div class="flex-[1] px-1">
                    <button class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
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