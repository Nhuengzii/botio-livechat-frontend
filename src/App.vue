<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useConversationStore } from "./stores/conversation";
const conversationStore = useConversationStore();
type Source = {
  sourceID: string,
  sourceName?: string
  sourcePicture?: string,
  sourceType: "USER" | "ADMIN",
}

type Message = {
  conversationID: string,
  messageID: string,
  timeStamp: number,
  source: Source,
  message: string,
}
onMounted(() => {
  console.log('App mounted!');
  const socket = new WebSocket('wss://mgec4plwk7.execute-api.ap-southeast-1.amazonaws.com/test?shopId=1');
  socket.onopen = () => {
    console.log('WebSocket connected successfully');
  };
  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };
  socket.onerror = (err) => {
    console.log('WebSocket error', err);
  };
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(JSON.stringify(data, null, 2))

    const newMessage: Message = {
      conversationID: data.conversationID,
      messageID: data.messageID,
      timeStamp: data.timestamp,
      source: {
        sourceID: data.source.userID,
        sourceType: data.source.sourceType === "user" ? "USER" : "ADMIN",
      },
      message: data.message,
    }
    conversationStore.addMessage(newMessage.conversationID, newMessage);


  }
  onUnmounted(() => {
    console.log('App unmounted!');
    socket.close();
  });
});

</script>

<template >
  <!-- Navbar -->
  <div class="flex flex-[1] w-screen h-screen">
    <Navbar />
    <!--End Navbar-->

    <main class="flex flex-col grow pb-[12px]">
      <RouterView :key="$route.params.platform as string" />
    </main>
  </div>
</template>

<style></style>
