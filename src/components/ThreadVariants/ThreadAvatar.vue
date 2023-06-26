<template>
  <div class="h-[58px] w-[58px]"><img :src=profilePic class="rounded-full object-cover relative"></div>
  <div v-if="showPlatform"
    class="absolute top-10 left-11 bg-white rounded-full flex w-[26px] h-[26px] items-center justify-center">
    <font-awesome-icon v-if="platform === 'facebook'" :icon="['fab', 'facebook']" style="color: #2F58CD;" size="xl" />
    <font-awesome-icon v-if="platform === 'instagram'" :icon="['fab', 'instagram']" style="color: #DF2E38;" size="xl" />
    <font-awesome-icon v-if="platform === 'line'" :icon="['fab', 'line']" style="color: #38E54D;" size="lg" />
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
