<template>
    <div class="col-start-1 col-end-8 p-[12px] round-lg">
        <div class="flex flex-row">
            <div class="flex h-12 w-12 rounded-full bg-red-300 flex-shrink-0 pulse-background"></div>
            <div class="flex flex-col pulse-background w-[80%] ml-3 p-2 self-center rounded-xl">
                <div class="bg-blue-200 w-[40%] h-2.5 py-1 my-1 "></div>
                <div class="bg-blue-300 w-[36%] h-2.5 py-1 my-1"></div>
            </div>
        </div>
    </div>

    <div class="col-start-1 col-end-10 p-[12px] round-lg0">
        <div class="flex flex-row">
            <div class="flex h-12 w-12 rounded-full bg-red-300 flex-shrink-0 pulse-background"></div>
            <div class="flex flex-col pulse-background w-[80%] ml-3 p-2 self-center rounded-xl">
                <div class="bg-blue-200 w-[40%] h-2.5 py-1 my-1 "></div>
                <div class="bg-blue-300 w-[44%] h-2.5 py-1 my-1"></div>
                <div class="bg-blue-300 w-[36%] h-2.5 py-1 my-1"></div>
            </div>
        </div>
    </div>

    <div class="col-start-1 col-end-10 p-[12px] round-lg">
        <div class="flex flex-row">
            <div class="flex h-12 w-12 rounded-full bg-red-300 flex-shrink-0 pulse-background"></div>
            <div class="flex flex-col pulse-background w-[80%] ml-3 p-2 self-center rounded-xl">
                <div class="bg-blue-200 w-[40%] h-2.5 py-1 my-1 "></div>
                <div class="bg-blue-100 w-[44%] h-2.5 py-1 my-1"></div>
            </div>
        </div>
    </div>

    <div class="col-start-6 col-end-13 p-[12px] round-lg">
        <div class="flex items-center justify-start flex-row-reverse">
            <div class="flex flex-col pulse-background w-[80%] mr-3 p-3 self-center items-end rounded-xl">
                <div class="bg-blue-200 w-[40%] h-2.5 py-1 my-1 mx-2"></div>
                <div class="bg-blue-100 w-[54%] h-2.5 py-1 my-1 mx-2"></div>
                <div class="bg-blue-50 w-[54%] h-2.5 py-1 my-1 mx-2"></div>
            </div>
        </div>
    </div>



    <div class="col-start-6 col-end-13 p-[12px] round-lg">
        <div class="flex items-center justify-start flex-row-reverse">
            <div class="flex flex-col pulse-background w-[80%] mr-3 p-3 self-center items-end">
                <div class="bg-blue-200 w-[40%] h-2.5 py-1 my-1 mx-2"></div>
                <div class="bg-blue-100 w-[54%] h-2.5 py-1 my-1 mx-2"></div>
                <div class="bg-blue-50 w-[54%] h-2.5 py-1 my-1 mx-2"></div>
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

.message-info {
    width: 80%;
    height: 3rem;
    margin-left: 10px;
    animation: pulse-bg 1s infinite;
}

.pulse-background {
    animation: pulse-bg 1s infinite;
}

</style>