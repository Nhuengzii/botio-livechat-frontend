<template>
  <div class="flex static mx-3">

    <div class="w-full mx-1 ">
      <div class="flex rounded-lg justify-around items-center text-gray-500 ">
        <div class="relative w-full">
          <div class=" w-full h-full rounded-lg self-center border-2  pt-1 mt-1">
            <textarea v-show="images.length == 0" type="text" placeholder="พิมพ์ข้อความ" v-model="newMessage"
              @keydown.enter="sendMessageOnEnter" @input="handleTyping" :rows="calculateTextareaRows" class="inline-flex px-2  mb-6 w-full h-auto 
            text-black break-words outline-none resize-none max-h-64" />
            <div class="mb-10 flex">
              <button v-if="images.length > 0" @click="openImageDialog"
                class="flex items-center justify-center h-16 w-16 mt-5 ml-3 bg-gray-200 hover:bg-gray-300">+</button>
              <div v-for="(image, index) in images" :key="index" class="image-item ">
                <div class="static">
                  <img :src="image.url" class="h-24 my-2 rounded-xl" />
                  <div class="absolute top-3 right-1 ">
                    <button class="flex w-[15px] h-[15px] items-center justify-center rounded-full bg-red-300 text-[10px]"
                      @click="removeImage(index)">x</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inline-flex">
          <!-- show Modal Chat Message Template -->
          <Teleport to="body">
            <ModalTemplateChat v-if="uiStore.is_activeTemplateMessage" :platform="platform">
              <!--HEADER-->
              <template #header>
                <template v-if="uiStore.is_createTemplateMessage"> <!-- Header Modal create chat template-->
                  <HeaderCreateMessage :platform="platform" />
                </template>
                <template v-else-if="uiStore.is_editTemplateMessage"> <!-- Header Modal edit chat template-->

                </template>
                <template v-else> <!-- Header Modal chat template-->
                  <HeaderTemplate :platform="platform" />
                </template>
              </template>
              <!--END HEADER-->

              <!--BODY-->
              <template #body>
                <template v-if="uiStore.is_createTemplateMessage"> <!-- Body Modal create chat template-->
                  <BodyCreateMessage :conversation="converstion" />
                </template>

                <template v-else-if="uiStore.is_editTemplateMessage">
                  <BodyEditMessage />
                </template>
                <template v-else-if="uiStore.is_activeTemplateMessage">
                  <BodyTemplate :conversation="converstion" :is-fetch-template="isFetchTemplate" />
                </template>
              </template>
              <!--END BODY-->
              <template #footer>
                <FooterModalTemplateChat :platform="platform" />
              </template>
            </ModalTemplateChat>
          </Teleport>
        </div>
      </div>
    </div>

    <!-- space -->
    <div class="flex absolute bottom-2 right-7">
      <button>
        <EmojiPicker class="absolute bottom-10 right-0" v-show="isShowEmojiPicker" @select="onSelectEmoji" />
        <div @click="isShowEmojiPicker = !isShowEmojiPicker">
          <font-awesome-icon :icon="['fas', 'face-smile']" style="color: #394867;" size="xl" />
        </div>
      </button>
      <button @click="openImageDialog">
        <div class="px-3 ">
          <font-awesome-icon :icon="['fas', 'image']" style="color: #394867;" size="xl" />
        </div>
      </button>
      <div class="w-[22px] h-[22px] duration-500">
        <button @click="sendMessage" v-show="showSendMessageButton || images.length > 0" class="flex ">
          <div class="rounded-full bg-white">
            <font-awesome-icon :icon="['fas', 'paper-plane']" style="color: #00ABB3;" size="xl" />
          </div>
        </button>
        <button v-show="!showSendMessageButton && images.length == 0" type="button" id="show-modal"
          @click="handleClickActiveTemplate" class="flex">
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
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'



import ModalTemplateChat from '@/components/ModalTemplateChats/ModalTemplateChat.vue'
import HeaderTemplate from '@/components/ModalTemplateChats/MessageTemplate/HeaderTemplate.vue'
import BodyTemplate from '@/components/ModalTemplateChats/MessageTemplate/BobyTemplate.vue'
import HeaderCreateMessage from '@/components/ModalTemplateChats/CreateMessageTemplate/HeaderCreateMessage.vue'
import BodyCreateMessage from '@/components/ModalTemplateChats/CreateMessageTemplate/BodyCreateMessage.vue'
import FooterModalTemplateChat from '@/components/ModalTemplateChats/FooterModalTemplateChat.vue'
import BodyEditMessage from '@/components/ModalTemplateChats/EditMessageTemplate/BodyEditMessage.vue'


import { useUIStore } from '@/stores/UI';
import { useModalStore } from '@/stores/modal';
import type { Conversation } from '@/types/conversation';
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue'



const { platform, converstion } = defineProps<{
  platform: string
  converstion: Conversation
}>()



const modalStore = useModalStore()
const uiStore = useUIStore()
const newMessage = ref('');
const showSendMessageButton = ref(false);
const messateStore = useMessageStore()
const shopStore = useShopStore()
const { currentChat } = storeToRefs(messateStore)
let typingTimeout: number | undefined = undefined;
const isTyping = ref(false)
const isShowEmojiPicker = ref(false)
const isFetchTemplate = ref(false)
const countClick = ref(0);


import { useMessageStore } from '@/stores/message'
import BotioLivechat from '@/lib/BotioLivechat'
import { useShopStore } from '@/stores/shop'
import Swal from 'sweetalert2'


// click icon "chat-dot" to open createTemplate
const handleClickActiveTemplate = async () => {
  countClick.value++;
  uiStore.activeTemplateMessage();
  if (countClick.value === 1) {
    if (messateStore.currentChat === undefined) {
      return;
    }
    Swal.fire({
      title: 'กำลังโหลดข้อมูลเทมเพลต',
      html: '<div class="d-flex justify-content-center align-items-center"><img src="loading-icon.png" alt="Loading Icon" class="mr-2"/></div>',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      modalStore.platform = messateStore.currentChat.conversation.platform
      await modalStore.fetchDataTemplates();
      Swal.close()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามรถโหลดข้อมูลเทมเพลตได้',
        timerProgressBar: true,
        allowOutsideClick: true,
        showConfirmButton: true,
      });
      console.log("error in handleClickActiveTemplate");
      console.error("Error occurred while loading template:", error);
      // Handle the error gracefully, show an error message, etc.
    }
  }
};


const onSelectEmoji = (emoji: any) => {
  console.log(emoji);
  newMessage.value += emoji.i;
}



// dynamic area textarea input-messager
const calculateTextareaRows = computed(() => {
  const lineHeight = 20; // Adjust this value based on your font size and line height
  const maxRows = 5; // Set the maximum number of rows you want to show before enabling scrolling
  const numRows = Math.min(Math.ceil(newMessage.value.length / 50), maxRows); // Adjust the division value to control the number of characters per row
  const calculatedRows = numRows > 1 ? numRows : 2; // Ensure a minimum of 2 rows to display when there's no text or very little text

  return calculatedRows;
});



// boom use in MessageSender
const openImageDialog = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => handleFileChange(event);
  input.click();
};


const sendMessage = async () => {
  if (!currentChat?.value) {
    return;
  }
  const botioLivechat = new BotioLivechat(shopStore.shop_id)
  if (images.value.length > 0) {
    let a = currentChat.value?.conversation
    for (let i = 0; i < images.value.length; i++) {
      messateStore.sendImageMessage(currentChat.value!.conversation, images.value[i].file).then()
      console.log('sended')
    }
    images.value = []
  }
  else if (newMessage.value.trim() !== '') {
    // Handle sending the message here
    console.log('Sending message:', newMessage.value);
    let a = currentChat.value?.conversation!
    messateStore.sendTextMessage(currentChat.value!.conversation, newMessage.value)
    newMessage.value = ''; // Reset the input field after sending the message
    uiStore.is_typing = false;
  }
};


// allow key-enter to send message
const sendMessageOnEnter = (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior of the Enter key

    if (images.value.length > 0) {
      // Send the message and image
      //sendTextMessageWithImage();
      for (let i = 0; i < images.value.length; i++) {
        console.log(images.value[i])
        alert(images.value[i])
      }
    } else {
      // Send only the message
      sendMessage();
    } // Call the sendMessage function to send the message
  }
};


// if typing show button to sendMessage | image
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


watch(newMessage, () => {
  handleTyping();
});


interface Image {
  url: string;
  file: File;
}
const images = ref<Image[]>([]);

const handleFileChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const fileList = inputElement.files;

  if (fileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const imageUrl = URL.createObjectURL(file);
      images.value.push({ url: imageUrl, file });
    }
  }
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
};

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
  font-size: 16px;
  font-family: monospace;
}

.image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  display: flex;
  flex-wrap: wrap;

}

.image-item {
  margin: 10px;
}
</style>
