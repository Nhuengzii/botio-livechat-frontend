<template>
  <div class="flex justify-evenly mt-3">
    <div v-for="(platform, index) in availablesPlatforms.keys()">
      <PlatformIcon :platform="platform" :is-focus="$route.query.platform == platform"
        :unread="pageInformation(platform).unreadConversations" />
    </div>
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
