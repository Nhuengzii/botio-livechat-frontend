<template>
  <!-- header space-->
  <header class="h-[8%]"></header>
  <!--End header space-->

  <section class="flex h-full">

    <!--container chat left-->
    
    <ChatLeft />
    
    <!--End container chat left-->
    <RouterView />

  </section>

  <!-- footer space-->
  <footer class="h-[3%]"></footer>
  <!--End footer space-->
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import ChatLeft from "@/components/ChatLeft.vue";
import { useConversationStore } from "@/stores/conversation";
</script>
