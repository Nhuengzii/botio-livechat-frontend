<template>
    <aside class="flex-row justify-cente min-w-[180px] bg-stone-00 h-[98%] w-[10rem] rounded-3xl ml-2 p-4 border transition-all  bg-gray-700 
        duration-500 border-solid border-glass relative  mt-2  shadow-inner ">
        <div class=" overflow-hidden bg-gray-700    rounded-2xl items-center h-full w-full">
            <UserProfile />
            <button @click="loadTestStore.mockReceiveConversation(1000, 250, 10000)"
                class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-4 motion-safe:hover:scale-110">ConverBurst
            </button>

            <router-link to="/Services">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">บริการ
                </button>
            </router-link>

            <router-link to="/Stock">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">คลังสินค้า
                </button>
            </router-link>

            <router-link to="/Order">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ออเดอร์
                </button>
            </router-link>

            <router-link to="/Customer">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ลูกค้า
                </button>
            </router-link>

            <router-link to="/Modify">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ปรับแต่ง
                </button>
            </router-link>

            <router-link to="/livechat/facebook">
                <button @click="{
                    show_Chat = true; show_Line = false; show_Instagram = false;
                    if (show_Chat) { show_Facebook = true; };
                }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110 ">แชท

                </button>
            </router-link>

            <router-link to="/Setting">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-4 motion-safe:hover:scale-110">ตั้งค่า
                </button>
            </router-link>

            <router-link to="/Help">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ช่วยเหลือ
                </button>
            </router-link>

            <router-link to="/Logout">
                <button @click="{ show_Chat = false; }"
                    class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded w-full mt-1 motion-safe:hover:scale-110">ออกระบบ
                </button>
            </router-link>
        </div>

    </aside>
    <Transition name="nested">
        <div v-if="show_Chat" class="mt-2 h-[98%] bg-gray-300 rounded-2xl  items-center p-3   ">

            <div class="mt-4">
                <router-link to="/facebook">
                    <button @click="{ show_Instagram = false; show_Line = false; show_Facebook = true; }" type="button"
                        data-te-ripple-init data-te-ripple-color="light"
                        class="mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #1877f2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </button>
                </router-link>
            </div>

            <div class="mt-4">
                <router-link to="/instagram">
                    <button @click="{ show_Facebook = false; show_Line = false; show_Instagram = true; }" type="button"
                        data-te-ripple-init data-te-ripple-color="light"
                        class="mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #c13584">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
import { useLoadTestStore } from "@/stores/loadtest"
import { ref } from 'vue'
const loadTestStore = useLoadTestStore();
const show_Line = ref(false)
const show_Facebook = ref(false)
const show_Instagram = ref(false)
const show_Chat = ref(false)
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
}
</style>
