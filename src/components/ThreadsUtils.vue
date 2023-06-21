<template >
  <Normal v-if="mode == 'normal'" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUIStore } from '@/stores/UI';
import { useLivechatStore } from '@/stores/livechat';
import { useRoute } from 'vue-router';
import Normal from "@/components/ThreadUtilsVariants/Normal.vue"
const uiStore = useUIStore();
const livechatStore = useLivechatStore()
const query = ref("");
const route = useRoute()
defineProps<{
  mode: string
}>()

</script>
 
<style scoped></style>
 
 
