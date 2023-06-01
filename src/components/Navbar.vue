<template>
    <aside class="flex-row justify-cente min-w-[180px] bg-stone-00 h-[98%] w-[10rem] rounded-3xl ml-2 p-0 border transition-all  bg-gray-700 
        duration-500 border-solid border-glass relative  mt-2  shadow-inner ">
        <div class=" overflow-hidden bg-gray-700  items-center h-full w-full">
            <UserProfile />
            <div class="flex flex-col">
                <div>
                    <router-link to="/Start" class="relative bg-green-700">
                        <!-- <span class="absolute bg-green-500 h-[16px] w-full top-[5px] left-0 rounded-br-[30px] z-10"></span>
                        <span class="absolute bg-green-500 h-[16px] w-full top-[50px] left-0 rounded-tr-[30px] z-10"></span> -->
                        <button @click="{ show_Chat = false; updateActiveTap('start') }" :class="{'bg-gray-200 ml-2  transition duration-150' : active == 'start' as string}"
                            class="flex items-center hover:bg-gray-500 text-white  py-3 px-4  w-full mt-4 motion-safe:hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-flag-fill" viewBox="0 0 16 16">
                                <path
                                    d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                            </svg>
                            <span class="pl-3 text-white font-bold" :class="{'text-gray-800' : active == 'start' as string }">เริ่มต้น</span>
                        </button>
                    </router-link>

                    <router-link to="/Services">
                        <button @click="{ show_Chat = false; updateActiveTap('service')}" :class="{'bg-gray-200 ml-2  transition duration-150' : active == 'service' as string}"
                            class="flex items-center hover:bg-gray-500 text-white py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-book-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                            </svg>
                            <span class="pl-3 text-white font-bold" :class="{'text-gray-800' : active == 'service' as string }">บริการ</span>
                        </button>
                    </router-link>

                    <router-link to="/Stock">
                        <button @click="{ show_Chat = false; updateActiveTap('stock') }" :class="{'bg-gray-200 ml-2  transition duration-150' : active == 'stock' as string}"
                            class="flex items-center hover:bg-gray-500 text-white py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-basket2-fill" viewBox="0 0 16 16">
                                <path
                                    d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
                            </svg>
                            <span class="pl-3 text-white font-bold" :class="{'text-gray-800' : active == 'stock' as string }">คลังสินค้า</span>
                        </button>
                    </router-link>

                    <router-link to="/Order"> 
                        <button @click="{ show_Chat = false; updateActiveTap('order') }" :class="{'bg-gray-200 ml-2  transition duration-150' : active == 'order' as string}"
                            class="flex items-center hover:bg-gray-500 text-white py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-box-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
                            </svg>
                            <span class="pl-3 text-white font-bold" :class="{'text-gray-800' : active == 'order' as string }">ออเดอร์</span>
                        </button>
                    </router-link>

                    <router-link to="/Customer">
                        <button @click="{ show_Chat = false; updateActiveTap('customer') }" :class="{'bg-gray-200 ml-2  transition duration-150' : active == 'customer' as string}"
                            class="flex items-center  hover:bg-gray-500 text-white  py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path
                                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span class="pl-3 text-white font-bold" :class="{'text-gray-800' : active == 'customer' as string }">ลูกค้า</span>
                        </button>
                    </router-link>

                    <router-link to="/Modify">
                        <button @click="{ show_Chat = false; updateActiveTap('modify') }" :class="{'bg-gray-200 ml-2  transition duration-150' : active == 'modify' as string}"
                            class="flex items-center hover:bg-gray-500 text-white font-bold py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path
                                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span class="pl-3 text-white font-bold" :class="{'text-gray-800' : active == 'modify' as string }">ปรับแต่ง</span>
                        </button>
                    </router-link>

                    <router-link to="/livechat/facebook">
                        <button @click="{
                            show_Chat = true; show_Line = false; show_Instagram = false;
                            if (show_Chat) { show_Facebook = true; updateActiveTap('chat') };
                        }" :class="{'bg-gray-200 ml-1  transition duration-150' : active == 'chat' as string}"
                            class="flex items-center hover:bg-gray-500 text-white font-bold py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chat-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                            </svg>
                            <span class="pl-2 text-white font-bold" :class="{'text-gray-800' : active == 'chat' as string }">แชท</span>

                        </button>
                    </router-link>
                </div>


                <div class="">
                    <router-link class="" to="/Setting">
                        <button @click="{ show_Chat = false; }"
                            class="flex items-center hover:bg-gray-500 text-white font-bold py-3 px-4 rounded w-full mt-4 motion-safe:hover:scale-110">ตั้งค่า
                        </button>
                    </router-link>

                    <router-link to="/Help">
                        <button @click="{ show_Chat = false; }"
                            class="flex items-center hover:bg-gray-500 text-white font-bold py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ช่วยเหลือ
                        </button>
                    </router-link>

                    <router-link to="/Logout">
                        <button @click="{ show_Chat = false; }"
                            class="flex items-center hover:bg-gray-500 text-white font-bold py-3 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ออกระบบ
                        </button>
                    </router-link>
                </div>
            </div>

        </div>

    </aside>
    <Transition name="nested">
        <div v-if="show_Chat" class=" flex flex-col mt-2 h-[98%] bg-gray-200 rounded-2xl  items-center p-0   ">

            <div class="my-2 px-3 py-2 z-10" :class="{'bg-gray-100 w-full' : show_Facebook, 'opacity-20 hover:opacity-100' : !show_Facebook}">
                <router-link to="/livechat/facebook">
                    <button
                        @click="{ show_Instagram = false; show_Line = false; show_Facebook = true; show_central = false }"
                        type="button" data-te-ripple-init data-te-ripple-color="light"
                        class="mb-0 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #1877f2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </button>
                </router-link>
            </div>

            <div class="my-2 px-3 py-2 z-10" :class="{'bg-gray-100 w-full' : show_Instagram , 'opacity-20 hover:opacity-100' : !show_Instagram}">
                <router-link to="/livechat/instagram">
                    <button
                        @click="{ show_Facebook = false; show_Line = false; show_Instagram = true; show_central = false }"
                        type="button" data-te-ripple-init data-te-ripple-color="light"
                        class="mb-0 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #c13584">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </button>
                </router-link>

            </div>
            <div class="my-2 px-3 py-2 z-10" :class="{'bg-gray-100 w-full' : show_Line ,'opacity-20 hover:opacity-100' : !show_Line}">
                <router-link to="/livechat/line">
                    <button
                        @click="{ show_Facebook = false; show_Line = true; show_Instagram = false; show_central = false }"
                        type="button" data-te-ripple-init data-te-ripple-color="light"
                        class="flex items-center mb-0 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-line" viewBox="0 0 16 16">
                            <path
                                d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z" />
                        </svg>
                    </button>
                </router-link>
            </div>

            <div class="my-2 px-3 py-2  z-10 items-center justify-center" :class="{ 'bg-gray-100 w-full': show_central, 'opacity-20 hover:opacity-100' : !show_central }">
                <router-link to="/livechat/centralized">
                    <button
                        @click="{ show_Facebook = false; show_Line = false; show_Instagram = false; show_central = true }"
                        type="button" data-te-ripple-init data-te-ripple-color="light"
                        class="mb-0 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110   hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-chat-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                        </svg>
                    </button>
                </router-link>

            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUIStore } from '@/stores/UI';
import UserProfile from './UserProfile.vue';
import ChatLeft from './ChatLeft.vue'
const { unreadConversations } = storeToRefs(useConversationsStore())
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useConversationsStore } from '@/stores/conversations';
const show_Line = ref(false)
const show_Facebook = ref(false)
const show_Instagram = ref(false)
const show_central = ref(false)
const show_Chat = ref(true)
const active = ref("home")
const activeChat = ref("")

const updateActiveTap = (tab: string) => {
    active.value = tab;
}

const updateActiveTapChat = (platform: string) => {
    activeChat.value = platform
}

</script>
<style>
.outer,
.inner {
    background: #eee;
    padding: 30px;
    min-height: 100px;
}

.inner {
    background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
    transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
}

/* delay enter of nested element */
.nested-enter-active .inner {
    transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
    transform: translateX(30px);
    /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
    opacity: 0.001;
}</style>
