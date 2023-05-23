<template>
  <header class="pt-8 pb-3 px-3  bg-green-300"></header>
  <main class="flex h-[calc(100vh-48px)] bg-green-500">
    <ChatLeft/>
    <router-view :key="(route.params.conversation_id as string)"></router-view>
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router"
const route = useRoute()
import ChatLeft from "@/components/ChatLeft.vue";
</script>
