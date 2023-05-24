
    <template v-else>
        <div v-for="{ conversationID, conversationPicture, lastActivity, participants } in conversationsStore.conversations"
              >
            <router-link :to="{ name: 'Conver', params: { conversation_id: conversationID } } " @click=""
                class="flex px-[14px] pt-[20px] pb-[1.25rem]     w-full  border-b-2  hover:bg-blue-100 " v-if="filteredList(participants[0].username)">
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

                </div>
            </router-link>
        </div>
    </template>


<script setup lang="ts">
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { useConversationsStore } from '@/stores/conversations';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const conversationsStore = useConversationsStore();
const isFetching = ref(true);
const route = useRoute();
onBeforeMount(async () => {
    isFetching.value = true;
    await conversationsStore.fetchConversations(route.params.platform as string);
    isFetching.value = false;
})

const props = defineProps(['propA']);


function filteredList(text:String) {
  console.log(props.propA)
  if(text.toLowerCase().includes(props.propA.toLowerCase())){
    return true;
  }
  else{
    return false;   
  }
}
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
