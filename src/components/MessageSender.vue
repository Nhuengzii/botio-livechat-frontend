<template>
  <div class="flex flex-[1]  py-4 items-center bg-white mx-3">

    <!-- space -->
    <div class="flex-[1]">
      <button>
        <div class="pl-4 mr-8 text-gray-500">
          <font-awesome-icon :icon="['fas', 'image']" style="color: #394867;" size="xl" />
        </div>
      </button>
    </div>
    <!-- end space-->

    <div class="flex-[6] flex-col">
      <div class="flex bg-stone-300 rounded-[20px] justify-around items-center text-gray-500 py-4">

        <textarea type="text" placeholder="พิมพ์ข้อความ" v-model="newMessage" @keydown.enter="sendMessageOnEnter"
          @input="handleTyping" class="inline-flex bg-stone-300 w-full h-4 ml-8 break-words outline-none" />

        <div class="inline-flex">
          <button>
            <div class="pl-2 mr-4">
              <font-awesome-icon :icon="['fas', 'face-smile']" style="color: #394867;" size="xl" />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- space -->
    <div class="pl-3 flex-[1]">
      <button @click="sendMessage" class="flex">
        <template v-if="showSendMessageButton">
          <div class="flex rounded-full bg-[#394867]">
            <font-awesome-icon :icon="['fas', 'paper-plane']" style="color: #00ABB3;" size="xl" class="p-2" />
          </div>
        </template>
        <template v-else>
          <div class="pl-2  text-gray-500">
            <font-awesome-icon :icon="['fas', 'comment-dots']" style="color: #394867;" size="xl" />
          </div>
        </template>

      </button>
    </div>
    <!-- end space-->

  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';
import { useUIStore } from '@/stores/UI';
import type { Conversation } from '@/types/conversation';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue'


/// use value from store ///

const uiStore = useUIStore()
const newMessage = ref('');
const showSendMessageButton = ref(false);
const livechatStore = useLivechatStore()
const { currentChat } = storeToRefs(livechatStore)
let typingTimeout: number | undefined = undefined;

///////////////////////////

/// move to store
const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    // Handle sending the message here
    console.log('Sending message:', newMessage.value);
    let a = currentChat.value?.conversation!
    livechatStore.sendMessage(a.platform, a.pageID, a.conversationID, a.participants[0].userID, newMessage.value)

    newMessage.value = ''; // Reset the input field after sending the message
    uiStore.is_typing = false;
  }
};
////////////////////////////

/// move to store
const sendMessageOnEnter = (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior of the Enter key

    sendMessage(); // Call the sendMessage function to send the message
  }
};
////////////////////////////

/// move to store
const handleTyping = () => {
  clearTimeout(typingTimeout); // Clear the previous typing timeout

  if (newMessage.value.trim() !== '') {
    // If there is a message, set a new typing timeout
    typingTimeout = setTimeout(() => {
      // Handle typing finished logic here
      showSendMessageButton.value = true;
    }, 100); // Set the typing timeout duration according to your needs
  } else {
    // If the message is empty, hide the send message button
    showSendMessageButton.value = false;
  }
};
////////////////////////////



watch(newMessage, () => {
  handleTyping();
});


</script>

<style scoped>
.background-d9 {
  background-color: rgba(217, 217, 217, 0.3);

}
</style>
