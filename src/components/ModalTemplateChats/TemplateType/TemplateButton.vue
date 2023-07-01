<template>
    <div class="flex mx-2 my-4 px-4">
        <div class="bg-white  border-2 rounded-lg w-full">
            <div class="flex items-center justify-center w-60 h-40 bg-blue-700 rounded-t-lg">
                <img :src="modalStore.imagePreview" alt="" class="object-cover h-full w-full overflow-hidden" v-if="modalStore.imagePreview">
                <p class="text-white" v-else>image</p>
            </div>
            <div class="border-b-2 flex flex-col w-60 items-start px-3">
                <h1 class="break-all  py-2 max-h-16 w-64 font-semibold text-ellipsis" v-if="modalStore.titleUserInput">
                    {{ modalStore.titleUserInput }}
                </h1>
                <h1 class="break-all  py-2 font-semibold" v-else>
                    หัวข้อ
                </h1>
                <p class="break-all  pb-4 max-h-32 w-60 text-ellipsis overflow-hidden" v-if="modalStore.textUserInput">
                    {{ modalStore.textUserInput }}
                </p>
                <p class="break-all pb-4 " v-else>
                    ข้อความ . . .
                </p>
            </div>
            <div class="flex flex-col">
                <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่1</button>
                <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่1</button>
                <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่1</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();
</script>

<style scoped></style>