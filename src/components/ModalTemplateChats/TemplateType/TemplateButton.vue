<template>
    <div class="flex mx-2 my-4 px-4">
        <div class="bg-white  border-2 rounded-lg">
            <div class="flex items-center justify-center w-52 h-32 bg-blue-700 rounded-t-lg">
                <p class="text-white">image</p>
                <img src="" alt="">
            </div>
            <div class="border-b-2 flex flex-col items-start">
                <h1 class="break-all pl-3 pt-2 font-semibold">หัวข้อ</h1>
                <p class="break-all pl-3 pb-4">ข้อความ . . .</p>
            </div>
            <div class="flex flex-col">
                <button class="bg-gray-100 hover:bg-gray-100 border-b-2 py-2">ปุ่มกดที่1</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

</script>

<style scoped></style>