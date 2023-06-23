<template>
  <div class="flex justify-evenly mt-3">
    <PlatformIcon platform="all" :is-focus="$route.query.platform == 'all'"
      :unread="pageInformation('all')!.unreadConversations" />
    <PlatformIcon platform="facebook" :is-focus="$route.query.platform == 'facebook'"
      :unread="pageInformation('facebook')!.unreadConversations" />
    <PlatformIcon platform="instagram" :is-focus="$route.query.platform == 'instagram'"
      :unread="pageInformation('instagram')!.unreadConversations" />
    <PlatformIcon platform="line" :is-focus="$route.query.platform == 'line'"
      :unread="pageInformation('line')!.unreadConversations" />
  </div>
  <div class="py-1 mt-2 duration-300 w-[12%] bg-[#27374D] rounded-xl" 
  :class="[$route.query.platform == 'all'? 'ml-[10.5%]':$route.query.platform == 'facebook'?  'ml-[33%]':($route.query.platform == 'instagram')? 'ml-[55%]':'ml-[77.5%]']"></div>
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
