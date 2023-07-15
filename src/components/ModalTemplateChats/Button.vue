<template>
    <div>
        <button @click="">Click me</button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>

<style scoped>

</style>