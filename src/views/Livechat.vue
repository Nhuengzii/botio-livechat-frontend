<template>
    <main class="flex h-[calc(100vh-24px)]" v-if="ready">
        <LeftPanel />
        <Chats />

        <!-- start customer view -->
        <div class="flex flex-1 mx-3"></div>
        <!--end customer view -->

    </main>
    <div v-if="!ready" class="w-full h-full">
        <div id="loading-wrapper">  
            <div id="loading-text">กำลังโหลด</div>
            <div id="loading-content"></div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import LeftPanel from './subs/LeftPanel.vue';
import Chats from './subs/Chats.vue';
import { onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShopStore } from '@/stores/shop';
import { useWebsocketStore } from '@/stores/websocket';
const shopStore = useShopStore()
const websocketStore = useWebsocketStore()
const router = useRouter()
const ready = ref(false)


onBeforeMount(async () => {
    const shop_id = shopStore.shop_id
    if (shop_id === '-1') {
        router.replace('/')
    }
    await shopStore.fetchShopInformation()
    await shopStore.fetchPlatformInformation()
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 2000)
    })
    ready.value = true
})

onMounted(() => {
    const shopID = shopStore.shop_id
    websocketStore.connect(shopID)
})

onUnmounted(() => {
    websocketStore.disconnect()
})

</script>

<style scoped>
  #loading-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  #loading-text {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #27374D;
    width: 100px;
    height: 30px;
    margin: -7px 0 0 -45px;
    text-align: center;
    font-family: 'PT Sans Narrow', sans-serif;
    font-size: 20px;
  }

  #loading-content {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 170px;
    height: 170px;
    margin: -85px 0 0 -85px;
    border: 3px solid #F00;
  }

  #loading-content {
    border: 3px solid transparent;
    border-top-color: #27374D;
    border-bottom-color: #27374D;
    border-radius: 50%;
    -webkit-animation: loader 2s linear infinite;
    -moz-animation: loader 2s linear infinite;
    -o-animation: loader 2s linear infinite;
    animation: loader 2s linear infinite;
  }

  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
 
