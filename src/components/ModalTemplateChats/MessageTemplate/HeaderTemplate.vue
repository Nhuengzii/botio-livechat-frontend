<template>
    <div class="flex flex-col">
        <header class="flex justify-between items-center " id="headerModal">
            <div class="bg-blue-dark py-1 px-5 flex items-center rounded-xl">
                <h3 class="text-[15px] text-white font-semibold pr-4">เทมเพลตข้อความสำหรับ</h3>
                <div class="flex bg-white rounded-full w-8 h-8 items-center justify-center">
                    <font-awesome-icon v-if="props.platform === 'facebook'" :icon="['fab', 'facebook']" style="color: #2F58CD;"
                        size="xl" />
                    <font-awesome-icon v-if="props.platform === 'instagram'" :icon="['fab', 'instagram']" style="color: #DF2E38;"
                        size="xl" />
                    <font-awesome-icon v-if="props.platform === 'line'" :icon="['fab', 'line']" style="color: #38E54D;"
                        size="xl" />
                    <!-- <font-awesome-icon :icon="['fab', 'facebook']" style="color: #2F58CD;" size="xl" /> -->
                </div>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
const uiStore = useUIStore()
const props = defineProps<{
  platform: string
}>()

</script>

<style scoped>
.background-d9-300 {
    background-color: rgba(217, 217, 217, 0.3);
}

.background-d9-250 {
    background-color: rgba(217, 217, 217, 0.25);
}

.color-d9 {
    color: rgba(217, 217, 217, 1);
}

.color-b2 {
    color: #B2B2B2;
}

.bg-ea {
    background-color: #EAEAEA;
}

.bg-ea-80 {
    background-color: #eaeaeacc;
}

.bg-blue-dark {
    background-color: #394867;
}

.bg-blue-dark-light {
    background-color: #39486788;
}

.bg-blue-dark-green-90 {
    background-color: #00aab3e5;
}

.color-dark-green {
    color: #00ABB3;
}
</style>