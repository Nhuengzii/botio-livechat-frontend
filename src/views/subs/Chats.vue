<template>
  <div class="flex-[2] bg-green-200">
    <vue3-tabs-chrome :tabs="tabs" v-model="tab" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Vue3TabsChrome from "vue3-tabs-chrome"
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
const tab = ref('google')
const tabs = ref([
  {
    label: 'google',
    key: 'google'
  },
  {
    label: 'facebook',
    key: 'facebook'
  }
])
</script>

<style scoped></style>
