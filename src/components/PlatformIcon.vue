<template>
  <router-link :to="{ path: '/livechat', query: { platform: platform } }">
    <div>
      <div class="rounded-full bg-white p-2">
        <font-awesome-icon v-if="platform === 'facebook'" :icon="['fab', 'facebook']" style="color: #2F58CD;" size="xl" />
        <font-awesome-icon v-if="platform === 'line'" :icon="['fab', 'line']" style="color: #38E54D;" size="xl" />
        <font-awesome-icon v-if="platform === 'instagram'" :icon="['fab', 'instagram']" style="color: #DF2E38;"
          size="xl" />
      </div>
    </div>
    <div class="px-4 py-1 mt-2" :class="isFocus ? 'bg-[#27374D]' : 'bg-[#ffffff00]'"></div>
  </router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUIStore } from '@/stores/UI';
const uiStore = useUIStore();
const statusapp = ref(false)



const { platform, isFocus, unread } = defineProps<{
  platform: string,
  isFocus: boolean,
  unread: number
}>()


</script>

<style scoped></style>
