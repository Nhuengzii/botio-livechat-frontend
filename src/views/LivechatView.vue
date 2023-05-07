<template>
  <!-- header space-->
  <header class="h-[8%]"></header>
  <!--End header space-->

  <section class="flex h-full">

    <!--container chat left-->
    <div class="flex-[1] bg-green-100 rounded-[18px] mx-[10px]">
      <h1>This is list of conversations of platform: {{ $route.params.platform }}</h1>
    </div>
    <!--End container chat left-->
    <RouterView />

  </section>

  <!-- footer space-->
  <footer class="h-[3%]"></footer>
  <!--End footer space-->
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
</script>
