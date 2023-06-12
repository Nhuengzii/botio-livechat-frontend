<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const platform = route.params.platform as string
</script>

<template ></template>

<style scoped></style>
