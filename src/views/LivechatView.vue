<template>
  <!-- header space-->
  <header class="h-[8%]"></header>
  <!--End header space-->

  <section class="flex h-full">

    <!--container chat left-->

    <ChatLeft />

    <!--End container chat left-->
    <router-view :key="$route.params.conversation_id as string"></router-view>

  </section>

  <!-- footer space-->
  <footer class="h-[3%]"></footer>
  <!--End footer space-->
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import ChatLeft from "@/components/ChatLeft.vue";
</script>
