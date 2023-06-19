<template>
  <div class="flex-[2] shrink-1 mx-3 background-d9">
    <div class="flex flex-col w-full h-full ">

      <!-- header chats-->
      <header class="bg-white flex-[2] mx-3 mb-4">
        <div class="flex items-center py-5">

          <!-- show name conversation-->
          <div class="mx-3 object-cover h-12 w-12 rounded-full">
            <img :src="currentChat?.conversation.participants[0].profilePic.src" class="rounded-full" />
          </div>

          <!-- show picture conversation -->
          <div class="px-4">
            <p class="">{{ currentChat?.conversation.participants[0].username ?? 'ไม่มีชื่อ' }}</p>
          </div>

        </div>
      </header>


      <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mx-3" id="containMessage"
        ref="conversationRef">
        <div class="grid grid-cols-12 gap-y-2">
          <template v-for="(message, index) in currentChat?.messages" key="message.messageID">

            <!-- user is send message-->
            <template v-if="message.source.userType === 'user'">
              <div class="col-start-1 col-end-8 p-4 round-lg">
                <MessageBlock :message="message" :conversation="currentChat!.conversation" />
              </div>
            </template>

            <!-- admin is send message-->
            <template v-else>
              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <MessageBlock :message="message" :conversation="currentChat!.conversation" />
              </div>
            </template>


          </template>
        </div>
      </main>

      <MessageSender />
    </div>





  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from "@/stores/livechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref, type Ref, onBeforeMount, nextTick } from "vue";
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
import MessageBlock from "@/components/MessageBlock.vue";
import MessageSender from "@/components/MessageSender.vue";
import ImageProfileConversation from "@/components/MessageContents/subs/ImageProfileConversation.vue";
import { onBeforeRouteUpdate } from "vue-router";
const livechatStore = useLivechatStore()
const { openChatEventBus, botioLivechat, currentChat, } = storeToRefs(livechatStore)
const tab = ref('')
const currentFocusChat = ref("")
const isLoading = ref(false)
const conversationRef = ref<HTMLElement | null>(null);

function openChat(conversation: Conversation) {
  isLoading.value = true
  livechatStore.fetchMessages(conversation.platform, conversation).then(() => {
    console.log("fetch message success")
  })
}
openChatEventBus.value.on(openChat)


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
});

onUpdated(() => {
  scrollToLastMessage();
})


</script>

<style scoped>
.background-d9 {
  background-color: rgba(217, 217, 217, 0.3);

}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

