<template>
  <template v-if="mode == 'normal'">
    <h1>Normal Mode</h1>
  </template>
  <template v-else-if="mode == 'collapse'">
    <h1>Collapse Mode</h1>
  </template>
  <template v-else-if="mode == 'searching'">
    <h1> Search Mode </h1>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  mode: string
}>()
</script>

<style scoped></style>
