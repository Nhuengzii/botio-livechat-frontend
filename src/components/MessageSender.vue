<template>
  <div class="flex static mx-3 ">

    <div class="w-full mx-1 ">
      <div class="flex rounded-lg justify-around items-center text-gray-500 ">
        <div class="relative w-full">
          <div class=" w-full h-full rounded-lg self-center border-2  pt-1 mt-1">
            <textarea type="text" 
            placeholder="พิมพ์ข้อความ" 
            v-model="newMessage" 
            @keydown.enter="sendMessageOnEnter"
            @input="handleTyping" :rows="calculateTextareaRows"
            class="inline-flex px-2  mb-6 w-full h-auto 
             text-black break-words outline-none resize-none max-h-64 overflow-auto" />
          </div>
          <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
            class="absolute top-0 left-0 w-full h-full object-contain" />
        </div>
        <div class="inline-flex">


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
    <div class="flex absolute bottom-2 right-7">
      <button>
        <div class="">
          <font-awesome-icon :icon="['fas', 'face-smile']" style="color: #394867;" size="xl" />
        </div>
      </button>
      <button @click="openImageDialog">
        <div class="px-3 ">
          <font-awesome-icon :icon="['fas', 'image']" style="color: #394867;" size="xl" />
        </div>
      </button>
      <div class="w-[22px] h-[22px]">
      <button @click="sendMessage" v-if="showSendMessageButton" class="flex ">
        <div class="rounded-full bg-white">
          <font-awesome-icon :icon="['fas', 'paper-plane']" style="color: #00ABB3;" size="xl"   />
        </div>
      </button>
      <button v-else type="button" id="show-modal" @click="uiStore.activeTemplateMessage" class="flex">
        <div class="text-gray-500">
          <font-awesome-icon :icon="['fas', 'comment-dots']" style="color: #394867;" size="xl" />
        </div>
      </button>
    </div>
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
import { ref, watch, type Ref, computed } from 'vue'


const uiStore = useUIStore()
const newMessage = ref('');
const showSendMessageButton = ref(false);
const livechatStore = useLivechatStore()
const { currentChat } = storeToRefs(livechatStore)
let typingTimeout: number | undefined = undefined;
const isTyping = ref(false)

const image: Ref<string | null> = ref(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const openFilePicker = () => {
  fileInputRef.value?.click();
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};


const calculateTextareaRows = computed(() => {
  const lineHeight = 20; // Adjust this value based on your font size and line height
  const maxRows = 5; // Set the maximum number of rows you want to show before enabling scrolling
  const numRows = Math.min(Math.ceil(newMessage.value.length / 50), maxRows); // Adjust the division value to control the number of characters per row
  const calculatedRows = numRows > 1 ? numRows : 2; // Ensure a minimum of 2 rows to display when there's no text or very little text

  return calculatedRows;
});

const selectedImage = ref<string | null>(null);

const openImageDialog = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => displaySelectedImage(event, selectedImage);
  input.click();
};

const displaySelectedImage = (event: Event, selectedImage: Ref<string | null>) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = () => {
      selectedImage.value = reader.result as string;
    };

    reader.readAsDataURL(file);
  } else {
    selectedImage.value = null;
  }
};


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


const sendMessageOnEnter = (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior of the Enter key

    if (selectedImage.value) {
      // Send the message and image
      sendTextMessageWithImage();
    } else {
      // Send only the message
      sendMessage();
    } // Call the sendMessage function to send the message
  }
};



const handleTyping = () => {
  clearTimeout(typingTimeout); // Clear the previous typing timeout

  if (newMessage.value.trim() !== '') {
    // If there is a message, set a new typing timeout
    typingTimeout = setTimeout(() => {
      // Handle typing finished logic here
      showSendMessageButton.value = true;
      isTyping.value = true;
    }, 100); // Set the typing timeout duration according to your needs
  } else {
    // If the message is empty, hide the send message button
    showSendMessageButton.value = false;
    isTyping.value = false;
  }
};






const sendTextMessageWithImage = () => {
  if (newMessage.value.trim() !== '') {

    console.log('Sending message:', newMessage.value);
    console.log('Sending image:', selectedImage.value);

    newMessage.value = ''; // Reset the input field after sending the message
    selectedImage.value = null; // Reset the selected image
    uiStore.is_typing = false;
  }
};


watch(newMessage, () => {
  handleTyping();
});


</script>

<style scoped>
.resize-none {
  resize: none;
}

.hidden {
  display: none;
}

textarea::-webkit-scrollbar {
  width: 0.5em;
  /* Adjust the width as needed */
  background-color: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: transparent;
}

textarea::-webkit-scrollbar-track {
  background-color: transparent;
}

.textarea-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.textarea-container textarea::placeholder {
  text-align: center;
}
textarea[type='text'] { 
  font-size: 16px; font-family: monospace; 
}

 
</style>
