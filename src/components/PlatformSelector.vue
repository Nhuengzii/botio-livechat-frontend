<template>
  <div class="flex justify-evenly mt-3">
    <div>
      <PlatformIcon platform="all" :is-focus="$route.query.platform == 'all'"
        :unread="shopStore.platformInformation('all').unread_conversations" />
    </div>
    <div v-for="({ platform_name }, index) in shopStore.shop_information.available_platforms">
      <PlatformIcon :platform="platform_name" :is-focus="$route.query.platform == platform_name"
        :unread="shopStore.platformInformation(platform_name).unread_conversations" />
    </div>
  </div>
</template> 

<script setup lang="ts">
import PlatformIcon from '@/components/PlatformIcon.vue'
import { useShopStore } from '@/stores/shop';
import { storeToRefs } from 'pinia';
const shopStore = useShopStore()

</script>

<style scoped></style>
