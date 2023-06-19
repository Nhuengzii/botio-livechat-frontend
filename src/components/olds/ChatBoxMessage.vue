<template>
    <main class="flex flex-col relative overflow-x-hidden w-full h-full bg-50 glow bg-gray-200">
        <div class='grid grid-cols-12 gap-y-2'>
            <div v-for="(item, index) in message" :key="index" :class="{
                'col-start-1 col-end-8 p-[12px] round-lg': item.source.sourceType === 'USER',
                'col-start-6 col-end-13 p-3 rounded-lg': item.source.sourceType === 'ADMIN'
            }">
                <div :class="{
                    'flex flex-row': item.source.sourceType === 'USER',
                    'flex items-center justify-start flex-row-reverse': item.source.sourceType === 'ADMIN'
                }">
                    <div v-if="item.source.sourceType === 'USER'"
                        class='flex h-12 w-12 rounded-full bg-indigo-800 flex-shrink-0'>
                        <img :src="item.source.sourcePicture" alt="" class="object-cover h-12 w-12 rounded-full">
                    </div>
                    <div class="self-center" :class="{
                        'relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl': item.source.sourceType === 'USER',
                        'relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl': item.source.sourceType === 'ADMIN'
                    }">
                        <div>{{ item.message }}</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';


const props = defineProps(['message'])
const endOfComponentRef = ref();
</script>