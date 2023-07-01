<template>
  <div class="flex justify-evenly mt-3">
    <div v-for="(platform, index) in availablesPlatforms.keys()">
      <PlatformIcon :platform="platform" :is-focus="$route.query.platform == platform"
        :unread="pageInformation(platform).unreadConversations" />
    </div>
  </div>
  <div class="py-1 mt-2 duration-300 w-[12%] bg-[#27374D] rounded-xl"
    :class="[$route.query.platform == 'all' ? 'ml-[10.5%]' : $route.query.platform == 'facebook' ? 'ml-[33%]' : ($route.query.platform == 'instagram') ? 'ml-[55%]' : 'ml-[77.5%]']">
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
