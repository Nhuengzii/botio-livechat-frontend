<template>
    <div class="flex  items-center justify-start pl-[20px]">
        <div class="w-12 h-12 rounded-full">
            <img :src="datauser?.participants[0].profilePicture" alt="" class="object-cover h-12 w-12 rounded-full">
        </div>
        <div class="flex flex-col ml-4">
            <span class="">{{ props.datauser?.participants[0].username }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation'
interface Props {
    datauser: Conversation
}

const props = defineProps<Props>()
</script>

<style scoped></style>