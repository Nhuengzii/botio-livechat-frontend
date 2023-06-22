<template>
  <router-link :to="{ path: '/livechat', query: { platform: platform } }">
    <div class="relative">
      <div class="rounded-full bg-white p-2">
        <div v-if="platform === 'all'" class="flex items-center justify-center w-[22px] h-[22px]  bg-[#00ABB3] rounded-full text-[12px]">All</div>
        <font-awesome-icon v-if="platform === 'facebook'" :icon="['fab', 'facebook']" style="color: #2F58CD;" size="xl" />
        <font-awesome-icon v-if="platform === 'line'" :icon="['fab', 'line']" style="color: #38E54D;" size="xl" />
        <font-awesome-icon v-if="platform === 'instagram'" :icon="['fab', 'instagram']" style="color: #DF2E38;"
          size="xl" />
      </div>
      <div class="absolute rounded-full bg-red-500 text-white justify-center items-center w-4 h-4 flex text-[12px] duration-300"
        :class="isFocus ? 'top-0 left-7 ' : 'top-7 right-0'" v-if="unread > 0">
        <h1>{{ unread }}</h1>
      </div>
    </div>
    <div class="px-4 py-1 mt-2 duration-300" :class="isFocus ? 'bg-[#27374D]' : 'bg-[#ffffff00]'"></div>
  </router-link>
</template>

<script setup lang="ts">
const { platform, isFocus, unread } = defineProps<{
  platform: string,
  isFocus: boolean,
  unread: number
}>()


</script>

<style scoped></style>
