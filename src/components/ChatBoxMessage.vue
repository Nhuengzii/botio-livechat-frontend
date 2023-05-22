<template>
    <main class="flex-[7] flex-col relative overflow-x-auto w-full h-full bg-blue-50 glow">
        <div class="flex flex-col h-full">
            <div class='grid grid-cols-12 gap-y-2'>
                <div v-for="item in props.message" :key="item.messageID" :class="{
                    'col-start-1 col-end-8 p-[12px] round-lg': item.source.sourceType === 'USER',
                    'col-start-6 col-end-13 p-3 rounded-lg': item.source.sourceType === 'ADMIN'}">
                    <div :class="{
                        'flex flex-row items-center': item.source.sourceType === 'USER',
                        'flex items-center justify-start flex-row-reverse': item.source.sourceType === 'ADMIN'}">
                        <div v-if="item.source.sourceType === 'USER'"
                            class='flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 flex-shrink-0'>
                            <img :src="item.source.sourcePicture" alt=""
                                class="object-cover h-12 w-12 rounded-full">
                        </div>
                        <div :class="{
                            'relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl': item.source.sourceType === 'USER',
                            'relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl': item.source.sourceType === 'ADMIN'}">
                            <div>{{ item.message }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>

const props = defineProps(['message'])
</script>

