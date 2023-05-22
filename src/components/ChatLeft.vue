<template>
    <div class="flex-1 bg-green-100 rounded-[18px] mx-[10px] relative max-h-[100%] overflow-hidden pb-[10px] overscroll-contain font-serif">
        <!-- num message box-->
        <div v-if="$route.params.platform === 'facebook'" class="w-full h-full">
            
            <HeaderChatLeft :amount="numConversation"/>
            <!--- conversation list-->
            <ShowListConversation/>    
            <!--- end conversation list-->
        </div>
    </div>
</template>

<script setup lang="ts">
import { useConversationsStore } from '@/stores/conversations';
import ShowListConversation from './ShowListConversation.vue';
import HeaderChatLeft from './HeaderChatLeft.vue';
const conversationsStore = useConversationsStore();
import { onBeforeMount, onBeforeUpdate, onUpdated, ref, watch } from 'vue';
const numConversation = ref<number>(0)


onUpdated(() => {
    numConversation.value = conversationsStore.conversations.length
}),

watch(numConversation, function(){
    const newNumConversation = conversationsStore.conversations.length
    if (numConversation.value != newNumConversation){
        numConversation.value = newNumConversation
    }
})





</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
