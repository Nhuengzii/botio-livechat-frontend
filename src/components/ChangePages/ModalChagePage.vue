<script lang="ts" setup>
const props = defineProps({
    show: Boolean
})
</script>
<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container flex flex-col">
                <div class="modal-header flex flex-[1] justify-center">
                    <slot name="header">
                        
                    </slot>
                </div>

                <div class="modal-body flex flex-[6] justify-center">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer flex-[1] flex justify-center items-center">
                    <slot name="footer">
                        <div class="bg-[#D9D9D9] py-3 px-5">
                            <p class="text-xl font-bold">ไม่พบเพจที่ต้องการเชื่อมต่อ</p>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 80vw;
    height: 95vh;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
</style>