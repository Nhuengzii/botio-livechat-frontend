<template>
    <div v-for="n in numSkeletons" class="flex-col justify-center w-full .pulse-background">
        <div class="flex px-[14px] py-[4px] pb-[1.25rem] pulse-background my-1 rounded-lg animate-pulse">
            <div class="grow-1 shrink-0 w-[45px] h-[20px] mr-[20px]">
                <div class="w-[50px] h-[50px] bg-slate-200 rounded-full"></div>
            </div>
            <div class="grow-2 pb-2 mb-2">
                <div class="flex justify-between">
                    <span class="font-semibold leading-6 bg-slate-200 whitespace-nowrap w-[53%] h-4"></span>
                </div>
                <div class="flex justify-between whitespace-nowrap ">
                    <span class=" mt-2 truncate  bg-gray-100 w-[82%] h-2"></span>
                </div>
                <div class="flex justify-between whitespace-nowrap ">
                    <span class=" mt-2 truncate bg-gray-100 w-[30%] h-2"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { numSkeletons } = defineProps({
    numSkeletons: {
        type: Number,
        default: 4
    }
})
</script>

<style scoped>
@keyframes pulse-bg {
    0% {
        background-color: #eee;
    }

    50% {
        background-color: #eaeaea;
    }

    100% {
        background-color: #eee;
    }
}

@keyframes pulse-bg-blue {
    0% {
        background-color: #8bc3e9;
    }

    50% {
        background-color: #aec5d4;
    }

    100% {
        background-color: #8bc3e9;
    }
}

.message-info {
    width: 80%;
    height: 3rem;
    margin-left: 10px;
    animation: pulse-bg 1s infinite;
}

.pulse-background {
    animation: pulse-bg 1s infinite;
}

.pulse-background-blue {
    animation: pulse-bg-blue 1s infinite;
}
</style>
