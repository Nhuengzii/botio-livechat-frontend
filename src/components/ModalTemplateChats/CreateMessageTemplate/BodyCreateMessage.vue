<template>
    <div class="flex justify-center">
        <div class="background-d9-250 w-[40vw] h-[80vh]">
            <!-- <div class="w-full"> -->
            <input class="my-2 w-full" type="text" placeholder="ชื่อข้อความ">
            <textarea class="" type="text" placeholder="ข้อความ" />
            <button @click="openImageDialog">add image</button>
            <div class="bg-red-100 w-48 h-48">
                <span v-if="!selectedImage">No image selected</span>
                <img class="object-cover" v-else :src="selectedImage" alt="Selected Image" />
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
import { ref, type Ref } from 'vue';
const uiStore = useUIStore()

// select image
const selectedImage = ref<string | null>(null);
const openImageDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => displaySelectedImage(event, selectedImage);
    input.click();
};

const displaySelectedImage = (event: Event, selectedImage: Ref<string | null>) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = () => {
            selectedImage.value = reader.result as string;
        };

        reader.readAsDataURL(file);
    } else {
        selectedImage.value = null;
    }
};
</script>

<style scoped></style>