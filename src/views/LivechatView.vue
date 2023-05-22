<template>
  <!-- header space-->
  <header class="h-[8%] min-h-[80px]"></header>
  <!--End header space-->

  <section class="flex h-full">

    <!--container chat left-->

    <ChatLeft />

    <!--End container chat left-->
    <router-view :key="route.params.conversation_id as string"/>

  </section>

  <footer class="h-[3%]">
  </footer>
  <!--End footer space-->
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router"
const route = useRoute()
import ChatLeft from "@/components/ChatLeft.vue";
</script>
