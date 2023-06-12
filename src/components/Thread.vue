<template>
  <div>
    <h1>THis is Thread block</h1>
    <h1>This me {{ conversation }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
import type { PropType } from 'vue';
const { conversation } = defineProps<{
  conversation: Conversation
}>()

</script>

<style scoped></style>
