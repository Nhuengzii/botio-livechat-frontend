<template>
  <div>
    <h1>This is Message block</h1>
    <h1>This is me {{ message }}</h1>
    <h1>From {{ conversation }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';
import type { PropType } from 'vue';
defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true
  },
  conversation: {
    type: Object as PropType<Conversation>,
    required: true
  }
})
</script>

<style scoped></style>
