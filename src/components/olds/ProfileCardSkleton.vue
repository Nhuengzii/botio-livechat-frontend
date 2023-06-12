<template>
    <div class="flex  items-center justify-start pl-[20px]">
        <div class="w-12 h-12 rounded-full bg-gray-300"></div>
        <div class="flex flex-col ml-4 w-[90%] bg-gray-200 justify-center p-[10px] rounded-[10px]">
            <div class="w-[80%] h-[10px] bg-gray-100 mb-[8px]"></div>
            <div class="w-[40%] h-[10px] bg-gray-100"></div>
        </div>
    </div>
</template>

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
</style>