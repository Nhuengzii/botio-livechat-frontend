<template>
    <div class="col-start-1 col-end-8 p-[12px] round-lg animate-pulse">
        <div class="flex flex-row">
            <div class="flex h-12 w-12 rounded-full bg-red-300 flex-shrink-0 pulse-background"></div>
            <div class="flex flex-col pulse-background w-[80%] ml-3 p-2 self-center rounded-xl">
                <div class="bg-blue-200 w-[40%] h-2 py-1 my-1 "></div>
                <div class="bg-blue-100 w-[36%] h-1 py-1 my-1 "></div>
                <div class="bg-blue-50 w-[36%] h-1 py-1 my-1 mb-4"></div>
            </div>
        </div>
    </div>

    <div class="col-start-1 col-end-8 p-[12px] round-lg animate-pulse">
        <div class="flex flex-row">
            <div class="flex h-12 w-12 rounded-full bg-red-300 flex-shrink-0 pulse-background"></div>
            <div class="flex flex-col pulse-background w-[80%] ml-3 p-2 self-center rounded-xl">
                <div class="bg-blue-200 w-[40%] h-1 py-1 my-1 "></div>
                <div class="bg-gray-100 w-[44%] h-1 py-1 my-1"></div>
                <div class="bg-gray-50 w-[36%] h-1 py-1 my-1 mb-4"></div>
            </div>
        </div>
    </div>

    <div class="col-start-1 col-end-8 p-[12px] round-lg animate-pulse">
        <div class="flex flex-row">
            <div class="flex h-12 w-12 rounded-full bg-red-300 flex-shrink-0 pulse-background"></div>
            <div class="flex flex-col pulse-background w-[80%] ml-3 p-2 self-center rounded-xl">
                <div class="bg-blue-200 w-[40%] h-1 py-1 my-1 "></div>
                <div class="bg-gray-100 w-[44%] h-1 py-1 my-1"></div>
                <div class="bg-gray-50 w-[44%] h-1 py-1 my-1 mb-4"></div>
            </div>
        </div>
    </div>

    <div class="col-start-7 col-end-13 p-[12px] round-lg animate-pulse">
        <div class="flex items-center justify-start flex-row-reverse">
            <div class="flex flex-col pulse-background w-[80%] mr-3 p-3 self-center items-end rounded-xl">
                <div class="bg-blue-200 w-[60%] h-1 py-1 my-1 mx-2"></div>
                <div class="bg-blue-100 w-[54%] h-1 py-1 my-1 mx-2"></div>
                <div class="bg-blue-50 w-[54%] h-1 py-1 my-1 mx-2"></div>
            </div>
        </div>
    </div>



    <div class="col-start-7 col-end-13 p-[12px] rounded-lg animate-pulse">
        <div class="flex items-center justify-start flex-row-reverse">
            <div class="flex flex-col pulse-background w-[80%] mr-3 p-3 self-center items-end">
                <div class="bg-blue-200 w-[40%] h-1 py-1 my-1 mx-2"></div>
                <div class="bg-blue-100 w-[54%] h-1 py-1 my-1 mx-2"></div>
                <div class="bg-blue-50 w-[54%] h-1 py-1 my-1 mx-2"></div>
            </div>
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