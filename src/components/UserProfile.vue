<template>
    <div class="flex gap-3 items-center flex-col bg-gray-700 rounded-2xl p-1">
        <div class="min-w-[3.5rem] h-[3.5rem] bg-gray-700">
            <img src="https://graph.facebook.com/108362942229009/picture?type=normal" alt=""
                class="w-full h-full rounded-full object-cover">
        </div>
        <div :class="{ 'opacity-0 delay-200 text-[0.75rem]': uiStore.is_expanded }">
            <h3 class="text-xl text-white">TestPage</h3>
            <button class="bg-gray-600 hover:bg-gray-500 text-white text-[0.75rem]  py-2 px-4 rounded w-full mt-1">เปลี่ยนเพจ
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
const uiStore = useUIStore();
</script>