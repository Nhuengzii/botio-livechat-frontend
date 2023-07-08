<template>
  <div class="flex-[2]  bg-while min-w-48">
    <div class="flex flex-col w-full h-full">
      <div v-show="!querying" class="flex mx-3">
        <!-- tab on top header chats content -->
        <Vue3TabsChrome :ref="setTabRef" :tabs="tabs" v-model="tabKey" :on-close="handleClose" class="bg-[#EEEEEE] "
          :class="{ 'w-[calc(100%-176px)] rounded-tl-[10px]': tabs.length > 0, 'w-[100%] rounded-t-[10px]': tabs.length == 0 }" />

        <!-- button click to closeTab conversation all -->
        <template v-if="tabs.length > 0">
          <button @click="clearTab"
            class="bg-[#EEEEEE] rounded-tr-[10px] hover:bg-white  w-44 flex flex-row justify-center items-center">
            <h1 class="pr-2 font-semibold text-[#27374D]">ปิดแท็บทั้งหมด</h1>
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl" color="red" />
          </button>
        </template>
      </div>

      <!-- header chats-->
      <header class=" mx-3 flex-[1] " :class="[querying ? 'pb-5 bg-[#EEEEEE] rounded-t-[10px]' : 'bg-[#EEEEEE] ']">
        <div v-show="!querying" class="flex items-center py-3 justify-start">

          <!-- show name conversation-->
          <div class="mx-6 object-cover h-12 w-12 rounded-full">

            <!-- ProfileConversation -->
            <img :src="currentChat?.conversation.participants[0].profilePic.src" class="rounded-full" />

            <!-- show icon platform in ProfileConversation -->
            <template v-if="currentChat?.conversation.participants[0].username">
              <div class="absolute top-8 left-8 bg-white rounded-full flex w-[20px] h-[20px] items-center justify-center">
                <!--show icon facebook -->
                <font-awesome-icon v-if="currentChat.conversation.platform === 'facebook'" :icon="['fab', 'facebook']"
                  style="color: #2F58CD;" size="sm" />

                <!-- show icon instagram-->
                <font-awesome-icon v-if="currentChat.conversation.platform === 'instagram'" :icon="['fab', 'instagram']"
                  style="color: #DF2E38;" size="sm" />

                <!-- show icon Line -->
                <font-awesome-icon v-if="currentChat.conversation.platform === 'line'" :icon="['fab', 'line']"
                  style="color: #38E54D;" size="sm" />

              </div>
            </template>
          </div>

          <!-- show picture conversation -->
          <div class="flex-1">
            <div class="px-4 flex items-center justify-center">
              <template v-if="currentChat?.conversation.participants[0].username">
                <p class="font-semibold text-[18px] text-[#3C4048]">{{ currentChat?.conversation.participants[0].username
                }}</p>
                <div class="flex ml-auto items-center">

                  <!-- click to search conversation  -->
                  <button @click="querying = true">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="xl" class="mx-4 button" />
                  </button>

                  <!-- just icon circle info-->
                  <button>
                    <font-awesome-icon :icon="['fas', 'circle-info']" size="xl" class="mx-4 " style="color: #000000;" />
                  </button>

                  <!-- just icon ellipsis-vertical -->
                  <button>
                    <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="mx-4 " size="xl"
                      style="color: #000000;" />
                  </button>

                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- search conversation  -->
        <div>
          <div v-show="querying" class="flex items-center  ">
            <div class="pl-8 pt-5" @click="() => { querying = false; query = ''; searchMode = false }">
              <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
            </div>
            <div class="flex items-center w-full pr-4 pl-2 mr-1 mt-5">

              <!-- input message want to search -->
              <input type="text"
                class="ml-2 bg-white pr-8 rounded-xl border border-gray-300 text-gray-900  outline-none   block w-full pl-2 p-1   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ค้นหาการสนทนา" v-model="query">

              <div class="absolute bottom-1 right-6 ">
                <button v-show="query != ''" class="ml-2" @click="query = ''" :class="[querying ? '' : 'z-50']">
                  <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
                </button>
              </div>
            </div>

            <!-- click to query message in conversation  -->
            <button class="px-5 py-1 mt-5 mr-6 rounded-xl "
              :class="[query == '' ? 'bg-[#B2B2B2]' : 'bg-blue-600	 hover:bg-blue-700']"
              @click="() => { if (query != '') { searchMode = true } }">
              <div class=" text-white">ค้นหา</div>
            </button>

          </div>
        </div>
      </header>

      <!-- main chat content-->
      <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mb-4  mx-3" id="containMessage"
        ref="conversationRef">

        <template v-if="searchMode">
          <MessageSearchResult :query="query" :conversation="currentChat!.conversation" />
        </template>
        <template v-else>
          <template v-if="currentChat !== null">
            <InfiniteLoading @infinite="loadmore" :firstload="false" :top="true"
              :identifier="currentChat?.conversation.conversationID">

              <!-- show animation fetch old message-->
              <template #spinner>
                <div class="flex justify-center pt-5 pb-3" v-if="isLoading">
                  <span class="loader"></span>
                </div>
                <span v-else></span>
              </template>

              <!-- if not no more data message show profile -->
              <template #complete>
                <div class="flex justify-center mt-2">
                  <img class="w-[100px] h-[100px] rounded-full"
                    :src="currentChat.conversation.participants[0].profilePic.src" />
                </div>
                <div class="flex justify-center text-[16px] font-bold mt-2">
                  {{ currentChat.conversation.participants[0].username }}
                </div>
              </template>

            </InfiniteLoading>
          </template>

          <div class="grid grid-cols-12 gap-y-0.5" ref="messagesContainerRef">
            <template v-for="(message, index, timestamp) in currentChat?.messages" :key="message.messageID">
              <!-- if new messge conversation is not same last message show date-->
              <template v-if="isNewDay(index)">
                <div class="col-start-5 col-end-9 py-8 px-4">
                  <div class="flex justify-center py-0.5">
                    <span class="bg-gray-100 rounded-2xl py-1 px-4 ">{{ getFormattedDate(message.timestamp) }}</span>
                  </div>
                </div>
              </template>

              <!-- Render the message content from user -->
              <template v-if="message.source.userType === 'user'">
                <div v-if="currentChat" class="col-start-1 col-end-8 max-w-full">
                  <MessageBlock :message="message" :conversation="currentChat.conversation"
                    :is-show-profile="shouldShowProfilePicture(index)" />
                </div>
              </template>

              <!-- Render the message content from admin -->
              <template v-else>
                <div v-if="currentChat" class="col-start-6 col-end-13">
                  <MessageBlock :message="message" :conversation="currentChat.conversation" :is-show-profile="false" />
                </div>
              </template>

            </template>
            <div id="bottom_messages"></div>
          </div>
        </template>
      </main>

      <!-- send Message&Image create TemplateMessage -->
      <template v-if="currentChat?.conversation.participants[0].username">
        <MessageSender :platform="currentChat.conversation.platform" />
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from "@/stores/livechat";
import type { Conversation } from "@/types/conversation";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref, type Ref, onBeforeMount, nextTick, defineComponent, reactive, watch, } from "vue";
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
import MessageBlock from "@/components/MessageBlock.vue";
import MessageSender from "@/components/MessageSender.vue";
import MessageSearchResult from "@/components/MessageSearchResult.vue";
import { getFormattedDate } from "@/lib/Time"
const livechatStore = useLivechatStore()
const { openChatEventBus, botioLivechat, currentChat, } = storeToRefs(livechatStore)
const isLoading = ref(false)
const conversationRef = ref<HTMLElement | null>(null);
const query = ref("");
const querying = ref(false);
// infinite loading
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
const isFetchingMore = ref(false);
const messagesContainerRef = ref<HTMLDivElement | null>(null);
const searchMode = ref(false);



async function loadmore($state) {
  if (isLoading.value) return;
  if (isFetchingMore.value) return;
  console.log('load more')
  isFetchingMore.value = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });
  isFetchingMore.value = false;
  const currentSize = currentChat.value?.messages.length;
  if (!currentSize) return;
  const olderMessage = await livechatStore.fetchMoreMessages();
  $state.loaded()


  const lastMid = currentChat.value?.messages[olderMessage?.length ?? 1 - 1].messageID;
  if (!lastMid) {
    return

  }
  const el = document.getElementById(lastMid);
  if (el) {
    nextTick(() => {
      el.scrollIntoView({ behavior: "auto" });
    });
  };
  if (olderMessage?.length === 0) {
    $state.complete();

  }
  console.log('load more done')
}


// tabs-chrome
import Vue3TabsChrome, { type Tab } from 'vue3-tabs-chrome'
import '@/assets/vue3-tabs-chrome.css'
import { onBeforeRouteUpdate } from "vue-router";
defineComponent({
  components: {
    Vue3TabsChrome
  }
})
const tabRef: Ref = ref()
const tabKey = ref(null as null | string)
const tabs: Array<Tab> = reactive<Array<Tab>>([
])
const setTabRef = (el: HTMLElement) => {
  tabRef.value = el
}
function clearTab() {
  currentChat.value = null
  // remove all tabs
  try {
    tabs.splice(0, tabs.length)
    tabKey.value = null
  } catch (e) {
    alert(`clear tab error ${e}`)
  }
}
const handleAdd = (conversation: Conversation) => {
  const key = `${conversation.platform}-${conversation.conversationID}`;
  for (const tab of tabs) {
    if (tab.key === key) {
      tabKey.value = key
      return;
    }
  }
  if (tabRef.value === null) {
    console.log('undefined tabRef')
    return;
  }
  tabRef.value.addTab({
    label: conversation.participants[0].username,
    key: key,
    favico: conversation.participants[0].profilePic.src,
  })
  tabKey.value = key
}

const handleClose = (tab: Tab, key: string, index: number) => {
  livechatStore.closeChat(key)
}

watch(tabKey, (newTab, oldTab) => {
  if (tabs.length === 0) {
    livechatStore.currentChat = null;
    return;
  }
  if (newTab === null) {
    return;
  }
  const [platform, conversationID] = newTab.split("-");
  livechatStore.markAsReadEventBus.emit(conversationID);
  livechatStore.openChat(platform, conversationID);
})


function openChat(conversation: Conversation) {
  isLoading.value = true
  handleAdd(conversation)
  livechatStore.fetchMessages(conversation.platform, conversation).then(() => {
    console.log("fetch message success")
    isLoading.value = false;
  })
  setTimeout(() => {
    // scroll to bottom
    const el = document.getElementById("bottom_messages");
    if (el) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }, 1000)
}
openChatEventBus.value.on(openChat)

onBeforeRouteUpdate((to, from, next) => {
  console.log("before route update")
  next()
})

const isNewDay = (index: number): boolean => {
  if (index === 0) {
    return true;
  }

  const previousMessage = currentChat.value?.messages[index - 1];
  const currentMessage = currentChat.value?.messages[index];

  if (!previousMessage || !currentMessage) {
    return true;
  }

  const previousDate = new Date(previousMessage.timestamp);
  previousDate.setHours(previousDate.getHours());
  const previousFormattedDate = previousDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const currentDate = new Date(currentMessage.timestamp);
  currentDate.setHours(currentDate.getHours());
  const currentFormattedDate = currentDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return previousFormattedDate !== currentFormattedDate;
};

const shouldShowProfilePicture = (index: number): boolean => {
  if (index === 0) return true;

  const previousMessage = currentChat.value?.messages[index - 1];
  const currentMessage = currentChat.value?.messages[index];

  if (!previousMessage || !currentMessage) return true; // Add null check

  const previousTime = new Date(previousMessage.timestamp).getTime();
  const currentTime = new Date(currentMessage.timestamp).getTime();

  const timeDiff = currentTime - previousTime;
  const minuteInMs = 60 * 1000;

  return (
    (previousMessage.source.userType !== 'user' && currentMessage.source.userType === 'user') || // Different user
    timeDiff > minuteInMs // Time interval greater than 1 minute
  );
};


const scrollToLastMessage = () => {
  nextTick(() => {
    nextTick(() => {
      const conversationContainer = conversationRef.value;
      if (conversationContainer) {
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
      }
    });
  });
};



onMounted(() => {
  scrollToLastMessage();
})


onUpdated(() => {
  scrollToLastMessage();
})

watch([query], ([newQuery], [prevQuery]) => {
  if (newQuery.length > 0) {
    console.log('by-message')
    if (!currentChat.value) {
      return;
    }
    livechatStore.searchConversationByMessage(currentChat?.value.conversation.platform, query.value).then((result) => {
    }
    )
    if (newQuery.length != prevQuery.length) {
      searchMode.value = false
    };
  } else {
    searchMode.value = false
  }
})

</script>

<style scoped>
.background-d9 {
  background-color: rgba(217, 217, 217, 0.3);

}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

button {
  color: #B2B2B2;
}

.button:hover {
  color: #000000;
  transition: 0.5s;
}

.loader {
  color: rgb(26, 156, 231);
  font-size: 32px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
}

@keyframes mltShdSpin {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
      0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    /* color: #E3FDFD; */
  }

  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em,
      0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    /* color: #CBF1F5; */
  }

  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em,
      -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em,
      -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    /* color: #A6E3E9; */
  }

  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
    /* color: #71C9CE; */
  }

  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
    /* color: #71C9CE; */
  }

  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em,
      0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    /* color: #71C9CE; */
  }
}

@keyframes round {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}
</style>

