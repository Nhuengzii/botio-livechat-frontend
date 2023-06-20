<template>
  <div class="flex justify-evenly">
    <PlatformIcon platform="facebook" :is-focus="false" :unread="3" />
    <PlatformIcon platform="instagram" :is-focus="false" :unread="3" />
    <PlatformIcon platform="line" :is-focus="false" :unread="7" />
  </div>
</template>

<script setup lang="ts">
import PlatformIcon from '@/components/PlatformIcon.vue'

</script>

<style scoped></style>
