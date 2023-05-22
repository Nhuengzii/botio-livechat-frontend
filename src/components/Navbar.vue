<template>
    <aside class="flex-row justify-center bg-indigo-950 h-[96%] w-[14rem] rounded-3xl ml-2 p-4 border transition-all 
        duration-500 border-solid border-glass relative">
        <div class="w-[12rem]">
            <UserProfile />
            <div class="top-3 px-6 py-4 overflow-hidden bg-gray-50 h-[calc(100vh-220px)] rounded-2xl items-center">
                <div class="space-y-2 font-medium ">
                    
                </div>

                <div class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    <router-link to="/line"
                        class="flex items-center p-3 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 ">
                        
                        <span class="ml-4">Line</span>
                    </router-link>
                    <router-link to="/facebook"
                        class="flex items-center p-3 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 ">
                        
                        <span class="ml-4">FaceBook</span>
                    </router-link>
                    <router-link to="/ig"
                        class="flex items-center p-3 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 ">
                        <span class="ml-4">Instagram</span>
                    </router-link>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUIStore } from '@/stores/UI';
import UserProfile from './UserProfile.vue';


</script>
