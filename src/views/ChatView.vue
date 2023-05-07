<template>
  <!-- container chat center -->
  <div class="flex-[2] bg-green-100 rounded-[18px] mx-[10px] min-w-[512px]">
    <h1>This is messages of conversation_id: {{ $route.params.conversation_id }} </h1>
  </div>
  <!--End container chat center -->

  <!--container chat right-->
  <div class="flex-[1] bg-green-100 rounded-[18px] mx-[10px]">
    <h1>This is profile of conversation_id: {{ $route.params.conversation_id }} </h1>
  </div>
  <!--End container chat right-->
</template>

<script setup lang="ts">

</script>

<style scoped></style>
