<template>
    <Transition name="modal">
        <div v-if="uiStore.is_activeTemplateMessage" class="modal-mask ">
            <div class="flex flex-col modal-container ">
                <div class="flex mb-2 " :class="{'justify-between' : uiStore.is_activeTemplateMessage, 'justify-end' : !uiStore.is_activeTemplateMessage }">
                    <template v-show="uiStore.is_createTemplateMessage || uiStore.is_editTemplateMessage">
                        <button class="" @click="handleButtonClickBack">
                            <div class="flex items-center ">
                                <div class="flex items-center justify-center rounded-full w-8 h-8 bg-[#394867]">
                                    <font-awesome-icon :icon="['fas', 'arrow-left-long']" style="color: #ffffff;" size="lg" />
                                </div>
                                <p class="text-lg pl-2 ">ย้อนกลับ</p>
                            </div>
                        </button>
                    </template>

                    <div class="modal-header flex-[1]  justify-between p-4  " :class="(props.platform=='facebook')? (uiStore.is_createTemplateMessage)? 'bg-blue-400 rounded-xl mr-7 drop-shadow-xl ml-20':'bg-blue-400 rounded-xl mr-7 drop-shadow-xl':(props.platform=='instagram')? 'bg-[#FA7070] rounded-xl mr-7 drop-shadow-xl':'bg-[#38E54D] rounded-xl mr-7 drop-shadow-xl'">
                        <slot name="header">default header</slot>
                    </div>
                    <div class="mt-4 mr-2">
                    <button @click="handleButtonClickToClose" class="w-8 h-8 rounded-full font-bold bg-red-400">
                        <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
                    </button>
                    </div>
                </div>
                <div class="modal-body  flex-[10] overflow-x-hidden  no-scrollbar justify-center px-10 rounded-xl shadow-sm p-5" :class="(props.platform=='facebook')? 'bg-blue-100':(props.platform=='instagram')? 'bg-red-100':'bg-green-200'">
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
import { useModalStore } from '@/stores/modal';
const uiStore = useUIStore()
const modalStore = useModalStore()
const props = defineProps<{
  platform: string
}>()
const handleButtonClickBack = () => {
    uiStore.activeCreateTemplateMessage();
    modalStore.reset();
}

const handleButtonClickToClose = () => {
    uiStore.closeTemplateMessage();
    modalStore.reset();
}

</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 4;
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