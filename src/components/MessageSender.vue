<template>
  <div class="flex flex-[1]  py-1 items-center bg-white mx-3">

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
      <div class="flex bg-stone-300 rounded-[20px] justify-around items-center text-gray-500 py-2">

        <textarea type="text" placeholder="พิมพ์ข้อความ" v-model="newMessage" @keydown.enter="sendMessageOnEnter"
          @input="handleTyping" class="inline-flex bg-stone-300 w-full h-4 ml-8 break-words outline-none" />

        <div class="inline-flex">
          <button>
            <div class="pl-2 mr-4">
              <font-awesome-icon :icon="['fas', 'face-smile']" style="color: #394867;" size="xl" />
            </div>
          </button>

          <!-- show Modal Chat Message Template -->
          <Teleport to="body">
            <ModalTemplateChat :show="uiStore.is_activeTemplateMessage">

              <!--HEADER-->
              <template #header>
                <template v-if="uiStore.is_createTemplateMessage"> <!-- Header Modal create chat template-->
                  <HeaderCreateMessage />
                </template>

                <template v-else-if="uiStore.is_editTemplateMessage"> <!-- Header Modal edit chat template-->
                  <p>edit message</p>
                </template>

                <template v-else> <!-- Header Modal chat template-->
                  <HeaderTemplate />
                </template>
              </template>
              <!--END HEADER-->

              <!--BODY-->
              <template #body>
                <template v-if="uiStore.is_createTemplateMessage"> <!-- Body Modal create chat template-->
                  <BodyCreateMessage />
                </template>

                <template v-else-if="uiStore.is_activeTemplateMessage"> <!-- Body Modal chat template-->
                  <BodyTemplate />
                </template>
              </template>
              
              <!--END BODY-->
              <template #footer>
                <div>

                </div>
              </template>
            </ModalTemplateChat>
          </Teleport>
        </div>
      </div>
    </div>

    <!-- space -->
    <div class="pl-3 flex-[1]">
      <button @click="sendMessage" v-if="showSendMessageButton" class="flex">
        <div class="flex rounded-full bg-[#394867]">
          <font-awesome-icon :icon="['fas', 'paper-plane']" style="color: #00ABB3;" size="xl" class="p-2" />
        </div>
      </button>
      <button v-else type="button" id="show-modal" @click="uiStore.activeTemplateMessage" class="flex">
        <div class="pl-2 text-gray-500">
          <font-awesome-icon :icon="['fas', 'comment-dots']" style="color: #394867;" size="xl" />
        </div>
      </button>
    </div>
    <!-- end space-->

  </div>
</template>

<script setup lang="ts">
import { useLivechatStore } from '@/stores/livechat';

import ModalTemplateChat from '@/components/ModalTemplateChats/ModalTemplateChat.vue'
import HeaderTemplate from '@/components/ModalTemplateChats/MessageTemplate/HeaderTemplate.vue'
import BodyTemplate from '@/components/ModalTemplateChats/MessageTemplate/BobyTemplate.vue'
import HeaderCreateMessage from '@/components/ModalTemplateChats/CreateMessageTemplate/HeaderCreateMessage.vue'
import BodyCreateMessage from '@/components/ModalTemplateChats/CreateMessageTemplate/BodyCreateMessage.vue'

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
    livechatStore.sendTextMessage(currentChat.value!.conversation, newMessage.value)

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

<style scoped></style>
