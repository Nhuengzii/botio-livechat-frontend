<template>
    <main class="flex h-[calc(100vh-24px)]" v-if="ready">
        <LeftPanel />
        <Chats />

        <!-- start customer view -->
        <div class="flex flex-1 mx-3"></div>
        <!--end customer view -->

    </main>
    <h1 v-if="!ready">YAYYAYAYAY</h1>
</template>

<script setup lang="ts">
import LeftPanel from './subs/LeftPanel.vue';
import Chats from './subs/Chats.vue';
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShopStore } from '@/stores/shopStore';
const shopStore = useShopStore()
const router = useRouter()
const ready = ref(false)

onBeforeMount(async () => {
    const shop_id = shopStore.shop_id
    if (shop_id === '-1') {
        router.replace('/')
    }
    await shopStore.fetchShopInformation()
    await shopStore.fetchPlatformInformation()
    ready.value = true
})
</script>

<style scoped></style>
 
