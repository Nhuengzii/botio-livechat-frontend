<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="flex flex-col modal-container">
                <div class="modal-header flex-[1] justify-between bg-blue-100">
                    <slot name="header">default header</slot>
                </div>

                <div class="modal-body bg-blue-100 flex-[3]">
                    <slot name="body">default body</slot>
                </div>

                <div class="modal-footer bg-blue-200 flex-[1]">
                    <slot name="footer">
                        default footer
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
    show: Boolean
})
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

</style>