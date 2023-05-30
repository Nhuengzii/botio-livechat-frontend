<template>
    <!--- conversation list-->
    <template v-if="isFetching">
        <div class="justify-center">
            <SklentonListConversation />
        </div>
    </template>
    <template v-else>
        <div v-bind="containerProps" style="height: 750px;">
            <div v-bind="wrapperProps">
                <div v-for="{ data: { conversationID, conversationPicture, lastActivity, participants, updatedAt, platform } } in list"
                    class="flex-col px-4 justify-center bg-gray-100 w-full  border-b-2  hover:bg-blue-100">
                    <router-link
                        :to="{ name: 'Conver', params: { conversation_id: conversationID }, query: { platform: platform } }"
                        class="flex px-[14px] pt-[20px] pb-[1.25rem] ">
                        <div class="grow-1 shrink-0 w-[45px] h-[45px] mr-[20px] ">
                            <div class=" w-[45px] h-[45px] bg-blue-200 rounded-full">
                                <img v-if="conversationPicture" :src="conversationPicture" alt=""
                                    class="object-cover w-full h-full rounded-full ">
                                <img v-else :src="participants[0].profilePicture" alt=""
                                    class="object-cover w-full h-full rounded-full ">
                            </div>
                        </div>
                        <div class="grow-2 ">
                            <div class="flex justify-between ">
                                <span class="text-sm font-semibold leading-6 text-gray-900  whitespace-nowrap">{{
                                    participants[0].username }}</span>
                            </div>
                            <div class="flex items-end justify-between whitespace-nowrap ">
                                <span
                                    class="text-ellipsis whitespace-nowrap mt-1 truncate text-sm leading-5 text-gray-500 ">{{
                                        lastActivity }}</span>
                            </div>
                            <p>{{ lastActivities[conversationID] }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </template>

    <!--- end conversation list-->
</template>

<script setup lang="ts">
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useConversationsStore } from '@/stores/conversations';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch, type Ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SkletonBoxMessage from './SkletonBoxMessage.vue';
import SklentonListConversation from './SklentonListConversation.vue';
import { useVirtualList } from "@vueuse/core"
import { computed } from '@vue/reactivity';

const route = useRoute();
const conversationsStore = useConversationsStore();
const { conversationsRaw } = storeToRefs(conversationsStore);
const isFetching = ref(false);
watch(() => conversationsRaw.value[route.params.platform as string].isFetching, (newVal, oldVal) => {
    isFetching.value = newVal;
})
const isGetAcivityTime = ref(true);

interface LastActivities {
    [id: string]: string;
}

const conversations = computed(() => conversationsStore.centalizedConversations);
const { list, containerProps, wrapperProps } = useVirtualList(conversations, {
    itemHeight: 112.5
})

const lastActivities: Ref<LastActivities> = ref({});

const updateLastActivities = () => {
    const currentTime = Date.now();
    const updatedLastActivities: LastActivities = {};

    for (const [index, items] of conversationsStore.conversations(route.params.platform as string).entries()) {
        const timeDifference = currentTime - items.updatedAt;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            updatedLastActivities[items.conversationID] = `${days} days ago`;
        } else if (hours > 0) {
            updatedLastActivities[items.conversationID] = `${hours} hours ago`;
        } else if (minutes > 0) {
            updatedLastActivities[items.conversationID] = `${minutes} minutes ago`;
        } else {
            updatedLastActivities[items.conversationID] = `${seconds} seconds ago`;
        }
    }

    lastActivities.value = updatedLastActivities;
};

onMounted(() => {
    updateLastActivities();
    setInterval(updateLastActivities, 10000); // Update every 10 seconds
});

onBeforeMount(async () => {
    await conversationsStore.fetchConversations(route.params.platform as string);
    updateLastActivities();
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
