<template>
  <div class="flex-[2] shrink-1 mx-3 background-d9">
    <div class="flex flex-col w-full h-full ">
      <h1>{{ isLoading }}</h1>

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


      <main class="flex-[12] overflow-x-hidden no-scrollbar h-full bg-white mx-3" id="containMessage" ref="conversationRef">
        <div class="grid grid-cols-12">
          <template v-for="(message, index, timestamp) in currentChat?.messages" key="message.messageID">
            
            <!-- Render the message content from user -->
            <template v-if="message.source.userType === 'user'">

              <template v-if="isNewDay(index)">
                <div class="col-start-6 col-end-8 py-4">
                  <div class="flex flex-row">{{ getFormattedDate(message.timestamp) }}</div>
                </div>
                
              </template>

              <div class="col-start-1 col-end-8 p-2 round-lg">
                <MessageBlock :message="message" :conversation="currentChat!.conversation" :is-same-time="isUserMessageOfSameTime(index)" />
              </div>
            </template>

            <!-- Render the message content from admin -->
            <template v-else>
              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <MessageBlock :message="message" :conversation="currentChat!.conversation" :is-same-time="isUserMessageOfSameTime(index)"/>
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
const { openChatEventBus, botioLivechat, currentChat, receivedMessageEventBus } = storeToRefs(livechatStore)
const tab = ref('')
const currentFocusChat = ref("")
const isLoading = ref(false)
const conversationRef = ref<HTMLElement | null>(null);

receivedMessageEventBus.value.on(incomingMessage)
function messageToActivity(message: Message): string {
  if (message.message.length > 0) {
    if (message.source.userType === "user") {
      return message.message;
    } else if (message.source.userType === "admin") {
      return "คุณ: " + message.message;
    } else {
      return `WTF ${message.source.userType} พิมพ์ข้อความ`
    }
  } else if (message.attachments.length > 0) {
    if (message.attachments[0].attachmentType === "image") {
      if (message.source.userType === "user") {
        return "ส่งรูปภาพ";
      } else if (message.source.userType === "admin") {
        return "คุณส่งรูปภาพ";
      } else {
        return `WTF ${message.source.userType} ส่งรูปภาพ`
      }
    }
  } else {
    return "WTF";
  }
  return "wwwwwwwwwwwwwwwwwwwwwwwww"
}


function incomingMessage(message: Message) {
  if (currentChat.value?.conversation.conversationID === message.conversationID) {
    const cloneConversation = { ...currentChat.value!.conversation }
    console.log(`incoming message ${message.messageID}`)
    cloneConversation.isRead = false
    cloneConversation.updatedTime = message.timestamp
    cloneConversation.lastActivity = messageToActivity(message)
    livechatStore.updateConversation(cloneConversation)
    currentChat.value!.messages.push(message)
  }
}

function openChat(conversation: Conversation) {
  isLoading.value = true
  botioLivechat.value.fetchMessages(conversation.platform, conversation.pageID, conversation.conversationID).then((messages) => {
    currentChat.value!.messages = messages
    isLoading.value = false
  })
  const updateConversation = { ...conversation }
  updateConversation.isRead = true
  livechatStore.updateConversation(updateConversation)
}
openChatEventBus.value.on(openChat)

onBeforeRouteUpdate((to, from, next) => {
  console.log("before route update")
  next()
})

const isNewDay = (index:number) => {
  if (index === 0) return true;

  const previousMessage = currentChat.value?.messages[index-1]
  const currentMessage = currentChat.value?.messages[index]

  if (!previousMessage || !currentMessage) return true;

  const previousDay = new Date(previousMessage.timestamp).getUTCDate();
  const currentDay = new Date(currentMessage.timestamp).getUTCDate();
  

  return previousDay !== currentDay;
};

const isUserMessageOfSameTime = (index: number): boolean => {
  if (index === 0) return true;

  const previousMessage = currentChat.value?.messages[index - 1];
  const currentMessage = currentChat.value?.messages[index];

  if (!previousMessage || !currentMessage) return false; // Add null check

  return previousMessage.source.userType !== 'user' && currentMessage.source.userType === 'user' && previousMessage.timestamp === currentMessage.timestamp;
};

const getFormattedDate = (timestamp: number): string => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);

  if (currentDate.toDateString() === messageDate.toDateString()) {
    return 'Today';
  } else {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return messageDate.toLocaleDateString(undefined, options);
  }
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
});

onUpdated(() => {
  scrollToLastMessage();
  
});

</script>

<style scoped>
.background-d9 {
  background-color: rgba(217, 217, 217, 0.3);

}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

