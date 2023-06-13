<template>
  <div>
    <img class="rounded-2xl" src="https://media.discordapp.net/attachments/1086248627862769706/1116381838697578608/k0cfi6g6qjwso0pe8kpxyz3ttzj8usjyrhqn2lzq.png?width=1352&height=676"/>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";
import type { Conversation } from "@/types/conversation";
defineProps<{
  message: Message
  conversation: Conversation
}>()
</script>

<style scoped></style>
