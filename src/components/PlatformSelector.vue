<template>
  <div class="flex justify-evenly">
    <PlatformIcon platform="facebook" :is-focus="$route.query.platform == 'facebook'"
      :unread="availablesPlatforms.get('facebook')!.unreadConversations" />
    <PlatformIcon platform="instagram" :is-focus="$route.query.platform == 'instagram'"
      :unread="availablesPlatforms.get('instagram')!.unreadConversations" />
    <PlatformIcon platform="line" :is-focus="$route.query.platform == 'line'"
      :unread="availablesPlatforms.get('line')!.unreadConversations" />
  </div>
</template>

<script setup lang="ts">
import PlatformIcon from '@/components/PlatformIcon.vue'
import { useUIStore } from '@/stores/UI'
import { storeToRefs } from 'pinia';
const uiStore = useUIStore();
const { availablesPlatforms } = storeToRefs(uiStore)

</script>

<style scoped></style>
