<template>
  <div class="flex justify-evenly">
    <PlatformIcon platform="facebook" :is-focus="$route.query.platform == 'facebook'" :unread="3" />
    <PlatformIcon platform="instagram" :is-focus="$route.query.platform == 'instagram'" :unread="3" />
    <PlatformIcon platform="line" :is-focus="$route.query.platform == 'line'" :unread="7" />
  </div>
</template>

<script setup lang="ts">
import PlatformIcon from '@/components/PlatformIcon.vue'

</script>

<style scoped></style>
