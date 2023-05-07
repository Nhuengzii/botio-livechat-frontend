<template>
    <div class="flex-[2] bg-green-100 rounded-[18px] mx-[10px] min-w-[512px]">
        <h1>This is messages of conversation_id: {{ $route.params.conversation_id }} </h1>
    </div>
</template>

<script setup lang="ts">
import ChatRight from '@/components/ChatRight.vue';
import ChatLeft from './ChatLeft.vue';
</script>

<style lang="scss" scoped>

</style>