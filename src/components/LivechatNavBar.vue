<template>
  <div>
  <div :class="[uiStore.is_expanded? 'bg-[#EAEAEA] duration-300':'bg-[#394867] duration-300']" class="h-full" > 
    <div class="px-6 py-4  " v-for=" platform in platforms">
    <PlatformIcon :platform=platform.platform :isFocus=platform.isfocus :unread=platform.unread    />
    </div>
  </div>
   </div>
</template>

<script setup lang="ts">
  import { useUIStore } from '@/stores/UI';
  import PlatformIcon from './PlatformIcon.vue';
  const platforms = [{
  platform: "instagram",
  isfocus: true,
  unread: 33
},{
  platform: "facebook",
  isfocus: false,
  unread: 10
},{
  platform: "line",
  isfocus: false,
  unread: 20
},
{
  platform: "centralized",
  isfocus: false,
  unread: 20
}]
  const uiStore = useUIStore();

</script>

<style scoped></style>
