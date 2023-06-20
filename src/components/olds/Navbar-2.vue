
<template>
    <div class="flex bg-[#EAEAEA] h-full overflow-hidden  ">
        <div :class="[uistore.is_expanded ? 'w-20 bg-[#394867] duration-700' : 'w-52 bg-[#EAEAEA] duration-500']">
            <!--Profile-->
            <div :class="[uistore.is_expanded ? '' : 'bg-white']" class="m-2 ">
                <div v-show="!uistore.is_expanded" class="flex p-3    duration-300">
                    <img class="rounded-full w-14 h-14 hover:scale-125 duration-500" src="../assets/profoetest.jpg" />
                    <div class="  ml-2">
                        <button
                            class=" items-center px-3 py-1  duration-300  rounded-md  bg-[#394867] text-white  hover:scale-105">NamePage</button>
                        <button @click="uistore.activeChagePage"
                            class="items-center px-3 py-1  duration-300  rounded-md bg-[#00ABB3] mt-2 hover:scale-105">change</button>

                        <!-- teleport to window change page -->
                        <Teleport to="body">
                            <!-- use the modal component, pass in the prop -->
                            <ModalChagePage :show="uistore.is_changePage">
                                <template #header>
                                    <div class="flex justify-between items-center w-[60vw]">
                                        <p class="py-4 px-3 bg-gray-200 text-xl">เลือกเพจที่ต้องการใช้งาน</p>
                                        <div class="flex w-30 h-30 rounded-full">
                                            <button @click="uistore.activeChagePage"
                                                class="bg-gray-200 text-xl py-2 px-4">X</button>
                                        </div>

                                    </div>
                                </template>
                                <template #body>
                                    <main class="flex flex-warp w-[60vw] h-full bg-stone-100 py-4">
                                        <button @click="livechatStore.changePage('108362942229009', '1')">
                                            <div class="bg-orange-300 w-20 h-20 rounded-full mx-5"></div>
                                        </button>
                                        <button @click="livechatStore.changePage('119465831164812', '2')">
                                            <div class="bg-orange-100 w-20 h-20 rounded-full mx-6"></div>
                                        </button>
                                        <button>
                                            <div class="bg-orange-200 w-20 h-20 rounded-full mx-6"></div>
                                        </button>
                                        <button>
                                            <div class="bg-orange-300 w-20 h-20 rounded-full mx-6"></div>
                                        </button>
                                    </main>
                                </template>
                            </ModalChagePage>
                        </Teleport>
                        <!-- end teleport to window change page -->

                    </div>
                </div>
                <div :class="[uistore.is_expanded ? 'justify-center' : 'justify-end py-2 mx-2 ']" class=" flex  ">
                    <button @click="uistore.ToggleMenu"
                        :class="[uistore.is_expanded ? 'justify-center' : 'justify-end bg-[#394867]']"
                        class="flex  space-x-2  w-full px-3 py-2  duration-500  rounded-md  hover:bg-gray-500  ">
                        <svg :class="[uistore.is_expanded ? 'fill-blue-500  hover:rotate-[360deg] hover:scale-125' : 'fill-white rotate-[180deg] hover:rotate-[540deg] hover:scale-125']"
                            class=" duration-500" xmlns="http://www.w3.org/2000/svg" height="1.5rem" fill="currentColor"
                            viewBox="0 0 512 512">
                            <path
                                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                        </svg>
                    </button>
                </div>
                <div v-show="uistore.is_expanded" class="flex  justify-center mt-4">
                    <img class="rounded-full w-12 h-12   hover:rotate-[360deg] hover:scale-125 duration-700"
                        src="../assets/profoetest.jpg" />
                </div>
            </div>
            <!--Menu-->
            <div class="m-2 justify-center duration-700 " :class="uistore.is_expanded ? 'mt-20' : 'mt-10 '">
                <router-link to="/start" class="relative  ">
                    <button @click="{ show_Chat = false; updateActiveTap('start') }"
                        :class="[uistore.is_expanded ? ((route.name == 'start') ? 'bg-gray-200 ml-2 hover:bg-[#EAEAEA]' : 'hover:bg-[#00ABB3]') : ((route.name == 'start') ? 'bg-[#394867] ml-2 hover:bg-[#394867]' : 'hover:bg-white')]"
                        class="flex justify-start   text-white w-full  py-3    duration-500">
                        <svg v-show="!uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'start' ? activeOpentextColor : OpentextColor) }"
                            class="bi bi-flag-fill ml-10" viewBox="0 0 16 16">
                            <path
                                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg><svg v-show="uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'start' ? ClosetextColor : ClosetextColor) }"
                            class="bi bi-flag-fill ml-5" viewBox="0 0 16 16">

                            <path
                                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg>
                        <span v-show="!uistore.is_expanded" class="pl-3 text-black font-bold"
                            :class="{ 'text-white': route.name == 'start' }">เริ่มต้น</span>
                    </button>
                </router-link>
                <router-link to="/ordermars" class="relative  ">
                    <button @click="{ show_Chat = false; updateActiveTap('service') }"
                        :class="[uistore.is_expanded ? ((route.name == 'ordermars') ? 'bg-gray-200 ml-2 hover:bg-[#EAEAEA]' : 'hover:bg-[#00ABB3]') : ((route.name == 'ordermars') ? 'bg-[#394867] ml-2 hover:bg-[#394867]' : 'hover:bg-white')]"
                        class="flex justify-start hover:bg-[#00ABB3] text-white w-full  py-3   duration-500 ">
                        <svg v-show="!uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'ordermars') ? activeOpentextColor : OpentextColor }"
                            class="bi bi-flag-fill ml-10" viewBox="0 0 16 16">
                            <path
                                d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                        </svg><svg v-show="uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'ordermars') ? ClosetextColor : ClosetextColor }"
                            class="bi bi-flag-fill ml-5" viewBox="0 0 16 16">
                            <path
                                d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                        </svg>
                        <span v-show="!uistore.is_expanded" class="pl-3 text-black font-bold"
                            :class="{ 'text-white': route.name == 'ordermars' }">บริการ</span>
                    </button>
                </router-link>
                <router-link to="/inventory" class="relative  ">
                    <button @click="{ show_Chat = false; updateActiveTap('stock') }"
                        :class="[uistore.is_expanded ? ((route.name == 'inventory') ? 'bg-gray-200 ml-2 hover:bg-[#EAEAEA]' : 'hover:bg-[#00ABB3]') : ((route.name == 'inventory') ? 'bg-[#394867] ml-2 hover:bg-[#394867]' : 'hover:bg-white')]"
                        class="flex justify-start hover:bg-[#00ABB3] text-white w-full  py-3   duration-500 ">
                        <svg v-show="!uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'inventory') ? activeOpentextColor : OpentextColor }"
                            class="bi bi-flag-fill ml-10" viewBox="0 0 16 16">
                            <path
                                d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
                        </svg><svg v-show="uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'inventory') ? ClosetextColor : ClosetextColor }"
                            class="bi bi-flag-fill ml-5" viewBox="0 0 16 16">
                            <path
                                d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
                        </svg>
                        <span v-show="!uistore.is_expanded" class="pl-3 text-black font-bold"
                            :class="{ 'text-white': (route.name == 'inventory') }">คลังสินค้า</span>
                    </button>
                </router-link>
                <router-link to="/orders" class="relative  ">
                    <button @click="{ show_Chat = false; updateActiveTap('order') }"
                        :class="[uistore.is_expanded ? ((route.name == 'orders') ? 'bg-gray-200 ml-2 hover:bg-[#EAEAEA]' : 'hover:bg-[#00ABB3]') : ((route.name == 'orders') ? 'bg-[#394867] ml-2 hover:bg-[#394867]' : 'hover:bg-white')]"
                        class="flex justify-start hover:bg-[#00ABB3] text-white w-full  py-3  duration-500">
                        <svg v-show="!uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'orders') ? activeOpentextColor : OpentextColor }"
                            class="bi bi-flag-fill ml-10" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
                        </svg><svg v-show="uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: (route.name == 'orders') ? ClosetextColor : ClosetextColor }"
                            class="bi bi-flag-fill ml-5" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
                        </svg>
                        <span v-show="!uistore.is_expanded" class="pl-3 text-black font-bold"
                            :class="{ 'text-white': (route.name == 'orders') }">ออเดอร์</span>
                    </button>
                </router-link>
                <router-link to="/customize" class="relative  ">
                    <button @click="{ show_Chat = false; updateActiveTap('modify') }"
                        :class="[uistore.is_expanded ? ((route.name == 'customize') ? 'bg-gray-200 ml-2 hover:bg-[#EAEAEA]' : 'hover:bg-[#00ABB3]') : ((route.name == 'customize') ? 'bg-[#394867] ml-2 hover:bg-[#394867]' : 'hover:bg-white')]"
                        class="flex justify-start hover:bg-[#00ABB3] text-white w-full  py-3  duration-500">
                        <svg v-show="!uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: route.name == 'customize' ? activeOpentextColor : OpentextColor }"
                            class="bi bi-flag-fill ml-10" viewBox="0 0 16 16">
                            <path
                                d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg><svg v-show="uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: route.name == 'customize' ? ClosetextColor : ClosetextColor }"
                            class="bi bi-flag-fill ml-5" viewBox="0 0 16 16">
                            <path
                                d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        <span v-show="!uistore.is_expanded" class="pl-3 text-black font-bold"
                            :class="{ 'text-white': route.name == 'customize' }">ปรับแต่ง</span>
                    </button>
                </router-link>
                <router-link :to='{ path: "/livechat", query: { platform: "facebook" } }' class="relative   ">
                    <button @click="{ show_Chat = false; updateActiveTap('chat') }"
                        :class="[uistore.is_expanded ? ((route.name == 'livechat') ? 'bg-gray-200 ml-2 hover:bg-[#EAEAEA]' : 'hover:bg-[#00ABB3]') : ((route.name == 'livechat') ? 'bg-[#394867] ml-2 hover:bg-[#394867]' : 'hover:bg-white')]"
                        class="flex justify-start hover:bg-[#00ABB3] text-white w-full  py-3  duration-500">
                        <svg v-show="!uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: route.name == 'livechat' ? activeOpentextColor : OpentextColor }"
                            class="bi bi-flag-fill ml-10" viewBox="0 0 16 16">
                            <path
                                d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                        </svg><svg v-show="uistore.is_expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor"
                            :style="{ color: route.name == 'livechat' ? ClosetextColor : ClosetextColor }"
                            class="bi bi-flag-fill ml-5" viewBox="0 0 16 16">
                            <path
                                d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                        </svg>
                        <span v-show="!uistore.is_expanded" class="pl-3 text-black font-bold"
                            :class="{ 'text-white': route.name == 'livechat' }">แชท</span>
                    </button>
                </router-link>
            </div>
        </div>
        <LivechatNavBar v-if="route.name == 'livechat'" />
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router';
import LivechatNavBar from '@/components/LivechatNavBar.vue';
import { ref } from 'vue'
import { useUIStore } from '@/stores/UI';
import ModalChagePage from './ChangePages/ModalChagePage.vue';
import { useLivechatStore } from '@/stores/livechat';

const uistore = useUIStore();
const livechatStore = useLivechatStore();
const route = useRoute();
const OpentextColor = ref('#3C4048')
const ClosetextColor = ref('#9BA4B5')
const activeOpentextColor = ref('white')
const show_Chat = ref(true)
const active = ref("home")

const updateActiveTap = (tab: string) => {
    active.value = tab;
}



</script>
 


