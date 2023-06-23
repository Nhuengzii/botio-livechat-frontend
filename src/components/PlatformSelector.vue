<template>
  <div class="flex justify-evenly">
    <PlatformIcon platform="all" :is-focus="$route.query.platform == 'all'"
      :unread="pageInformation('all')!.unreadConversations" />
    <PlatformIcon platform="facebook" :is-focus="$route.query.platform == 'facebook'"
      :unread="pageInformation('facebook')!.unreadConversations" />
    <PlatformIcon platform="instagram" :is-focus="$route.query.platform == 'instagram'"
      :unread="pageInformation('instagram')!.unreadConversations" />
    <PlatformIcon platform="line" :is-focus="$route.query.platform == 'line'"
      :unread="pageInformation('line')!.unreadConversations" />
  </div>
</template>

<script setup lang="ts">
import PlatformIcon from '@/components/PlatformIcon.vue'
import { useUIStore } from '@/stores/UI'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const uiStore = useUIStore();
const { availablesPlatforms, pageInformation } = storeToRefs(uiStore)

</script>

<style scoped></style>
