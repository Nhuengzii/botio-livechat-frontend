<template>
  <div>
    <div :class="[is_expanded ? 'bg-[#EAEAEA] duration-300' : 'bg-[#394867] duration-300']" class="h-full">
      <div class="px-6 py-4  " v-for="platform in  availablesPlatforms.keys() ">
        <PlatformIcon :platform=platform :isFocus="platform == $route.query.platform"
          :unread=availablesPlatforms.get(platform)!.unread key=platform />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
import { storeToRefs } from 'pinia';
import PlatformIcon from './PlatformIcon.vue';
const uiStore = useUIStore();
const { is_expanded, availablesPlatforms } = storeToRefs(uiStore);

</script>

<style scoped></style>
