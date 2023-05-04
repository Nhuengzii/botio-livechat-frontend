<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template >
  <!-- Navbar -->
  <div class="flex flex-[1] w-screen h-screen">
    <aside class="flex">
      <div class="w-72 bg-green-300"></div>
    </aside>
    <!--End Navbar-->

    <main class="flex flex-col grow pb-[12px]">

      <!-- header space-->
      <header class="h-[8%]"></header>
      <!--End header space-->

      <section class="flex h-full">

        <!--container chat left-->
        <div class="flex-[1] bg-green-100 rounded-[18px] mx-[10px]"></div>
        <!--End container chat left-->

        <!-- container chat center -->
        <div class="flex-[2] bg-green-100 rounded-[18px] mx-[10px] min-w-[512px]"></div>
        <!--End container chat center -->

        <!--container chat right-->
        <div class="flex-[1] bg-green-100 rounded-[18px] mx-[10px]"></div>
        <!--End container chat right-->

      </section>

      <!-- footer space-->
      <footer class="h-[3%]"></footer>
      <!--End footer space-->

    </main>
  </div>
  

</template>

<style>

</style>
