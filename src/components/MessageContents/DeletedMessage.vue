<template>
  <div
    class="self-center  py-2 px-3 rounded-xl  ml-2 text-sm font-medium bg-white text-[#4949498C] break-all overflow-hidden border-2 border-[#D9D9D9]">
    ข้อความถูกยกเลิก
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message";

defineProps<{
  message: Message
}>()




</script>

<style scoped>
.bg-message-admin {
  background-color: #394867;
}
</style>
