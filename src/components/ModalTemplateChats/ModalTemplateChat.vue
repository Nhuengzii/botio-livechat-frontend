<template>
    <Transition name="modal">
        <div v-if="uiStore.is_activeTemplateMessage" class="modal-mask">
            <div class="flex flex-col modal-container">
                <div class="flex mb-4" :class="{'justify-between' : uiStore.is_activeTemplateMessage, 'justify-end' : !uiStore.is_activeTemplateMessage }">
                    <template v-if="uiStore.is_createTemplateMessage">
                        <button class="bg-gray-200 px-5 py-3 rounded-full" @click="uiStore.activeCreateTemplateMessage">back</button>
                    </template>
                    <template v-else>
                        <div class="w-5 h-5"></div>
                    </template>
                    <button @click="uiStore.closeTemplateMessage" class="w-10 h-10 rounded-full font-bold bg-red-400">
                        <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
                    </button>
                </div>
                
                <div class="modal-header flex-[1] justify-between bg-white">
                    <slot name="header">default header</slot>
                </div>

                <div class="modal-body  flex-[5] overflow-x-hidden no-scrollbar justify-center">
                    <slot name="body">default body</slot>
                </div>

                <div class="modal-footer bg-white flex-[1]">
                    <slot name="footer">
                        
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">

import { useUIStore } from '@/stores/UI';
const uiStore = useUIStore()

</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 70vw;
    height: 95vh;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-color: rgba(0, 0, 0, 0.5);
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    position: relative;
    left: 70vw;
    top: 0;
}


.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

</style>