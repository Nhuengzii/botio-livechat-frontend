<template>
  <img :src=profilePic class="h-16 w-16 rounded-full object-cover relative">
  <div v-if="showPlatform" class="absolute bottom-0.5 right-6 bg-white rounded-full p-0.5">
    <font-awesome-icon v-if="platform === 'facebook'" :icon="['fab', 'facebook']" style="color: #2F58CD;" size="xl" />
    <font-awesome-icon v-if="platform === 'line'" :icon="['fab', 'line']" style="color: #38E54D;" size="xl" />
  </div>
</template>

<script setup lang="ts">
const { showPlatform, profilePic } = defineProps<{
  showPlatform: boolean,
  profilePic: string,
  platform: string,
}>()
</script>

<style scoped></style>
