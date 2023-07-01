<template>
    <div class="flex mx-2 my-4 px-4">
        <div class="bg-white  border-2 rounded-lg">

            <div class="flex items-center justify-center w-60 h-44 bg-blue-700 rounded-t-lg">
                <img :src="modalStore.imagePreview" alt="" class="object-cover h-full w-full overflow-hidden" v-if="modalStore.imagePreview">
                <p class="text-white" v-else>image</p>
                
            </div>

            <div class="border-b-2 flex flex-col items-start w-60">
                <h1 class="break-all px-3 py-2 max-h-16  font-semibold text-ellipsis" v-if=" modalStore.titleUserInput">
                    {{  modalStore.titleUserInput }}
                </h1>
                <h1 class="break-all px-3 py-2 font-semibold" v-else>
                    หัวข้อ
                </h1>
                <p class="break-all px-3 pb-4 min-h-32 max-h-48 text-ellipsis overflow-hidden" v-if="modalStore.textUserInput">
                    {{ modalStore.textUserInput }}
                </p>
                <p class="break-all pl-3 pb-4" v-else>
                    ข้อความ . . .
                </p>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();

</script>

<style scoped></style>