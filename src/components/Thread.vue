<template>
  <div class="bg-red-50">
    <h1>This me {{ conversation }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/conversation';
const { conversation } = defineProps<{
  conversation: Conversation
}>()

</script>

<style scoped></style>
