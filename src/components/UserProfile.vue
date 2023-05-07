<template>
    <div class="flex gap-3 items-center flex-col bg-gray-100 rounded-2xl p-2">
        <div class="min-w-[3.5rem] h-[3.5rem]">
            <img src="https://graph.facebook.com/108362942229009/picture?type=normal" 
            alt="" class="w-full h-full rounded-full object-cover">
        </div>
        <div :class="{'opacity-0 delay-200': store.is_expanded}">
            <h3 class="text-xl">TestPage</h3>
            <span class="text-[0.75rem] opacity-60">Change Page</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/UI';
const store = useUiStore();
</script>
