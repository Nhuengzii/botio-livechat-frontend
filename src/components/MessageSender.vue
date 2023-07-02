<template>
  <div class="flex static mx-3">

    <div class="w-full mx-1 ">
      <div class="flex rounded-lg justify-around items-center text-gray-500 ">
        <div class="relative w-full">
          <div class=" w-full h-full rounded-lg self-center border-2  pt-1 mt-1">
            <textarea v-show="images.length == 0" type="text" placeholder="พิมพ์ข้อความ" v-model="newMessage"
              @keydown.enter="sendMessageOnEnter" @input="handleTyping" :rows="calculateTextareaRows" class="inline-flex px-2  mb-6 w-full h-auto 
            text-black break-words outline-none resize-none max-h-64" />
            <div class="mb-10 flex   ">
              <button v-if="images.length > 0" @click="openImageDialog"
                class="flex items-center justify-center h-16 w-16 mt-5 ml-3 bg-gray-200 hover:bg-gray-300">+</button>
              <div v-for="(image, index) in images" :key="index" class="image-item ">
                <div class="static">
                  <img :src="image.url" class="h-28 w-24 my-2 rounded-xl" />
                  <div class="absolute top-0 left-14 ">d
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
            <ModalTemplateChat v-if="uiStore.is_activeTemplateMessage">

              <!--HEADER-->
              <template #header>
                <template v-if="uiStore.is_createTemplateMessage"> <!-- Header Modal create chat template-->
                  <HeaderCreateMessage :platform="platform" />
                </template>

                <template v-else-if="uiStore.is_editTemplateMessage"> <!-- Header Modal edit chat template-->
                  <p class="flex justify-center">{{ modalStore.selectedTemplate }}</p>
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
                <template v-else-if="uiStore.is_editTemplateMessage">
                  <div class="flex items-center h-full">

                    <template v-if="modalStore.selectedTemplate === 'Button'">
                      <div class="flex-1 shrink-0 flex h-full justify-center items-center">
                        <TemplateButton class="self-start" />
                      </div>

                      <div class="h-full flex-[2]">
                        <div class="flex flex-col pl-2">

                          <div class="flex">
                            <button @click="selecImage"
                              class="my-4 bg-gray-200 rounded-lg self-start px-3 py-2 shadow-lg">เลือกรูปภาพ</button>
                              <p v-if="modalStore.imagePreview" class="text-sm px-3 py-2 ml-1 w-48">{{ getImageFilename() }}</p>
                          </div>


                          <p class="text-base font-semibold pt-4">หัวข้อ (สูงสุดไม่เกิน 50 ตัวอักษร)</p>
                          <input type="text" placeholder="ชื่อหัวข้อ" v-model="modalStore.titleUserInput"
                            class="h-8 my-2 w-96 px-2 shadow-lg rounded-lg" maxlength="50">
                          <p class="mt-2 text-sm font-semibold">ข้อความ (สูงสุดไม่เกิน 150 ตัวอักษร)</p>
                          <textarea type="text" placeholder="ข้อความ..." v-model="modalStore.textUserInput"
                            class="h-44 w-[70%] px-2 py-1 mt-2 shadow-lg rounded-lg" maxlength="150" />
                        </div>
                        <div class="flex pt-4 pl-2">
                          <p class="px-2">ระบุชื่อของในปุ่ม</p>
                          <input type="text">
                          <p class="px-2">ระบุ url ที่จะไปเมื่อกดปุ่มนี้</p>
                          <input type="text">

                        </div>
                        <button @click="modalStore.actionAddButton" class="mt-2 ml-2 bg-gray-200 shadow-lg px-4 py-1">
                          <span class="py-1 px-2">เพิ่มปุ่ม</span>
                        </button>
                      </div>



                    </template>

                    <template v-else-if="modalStore.selectedTemplate === 'TextImage'">
                      <div class="flex-[1] shrink-0 flex h-full justify-center items-center">
                        <TemplateTextImage class="self-start" />
                      </div>

                      <div class="h-full flex-[2]">
                        <div class="flex flex-col pl-2">

                          <p class="text-base font-semibold pt-4">ชื่อของเทมเพลต</p>
                          <input type="text" v-model="modalStore.name" class="h-8 my-2 px-2 w-[50%] shadow-lg rounded-lg">

                          <!-- button select image-->
                          <div class="flex items-center">
                            <button @click="selecImage"
                              class="my-4 bg-gray-50 rounded-lg self-start px-3 py-2 shadow-lg hover:bg-green-100">เลือกรูปภาพ</button>
                              <p v-if="modalStore.imagePreview" class="text-sm px-3 py-2 ml-1 w-48">{{ getImageFilename() }}</p>
                          </div>


                          <p class="text-base font-semibold pt-4 ">หัวข้อ (สูงสุดไม่เกิน 50 ตัวอักษร)</p>
                          <input type="text" placeholder="ชื่อหัวข้อ" v-model="modalStore.titleUserInput"
                            class="h-8 my-2 w-96 px-2 shadow-lg rounded-lg" maxlength="50">
                          <p class="mt-2 text-sm font-semibold">ข้อความ (สูงสุดไม่เกิน 175 ตัวอักษร)</p>
                          <textarea type="text" placeholder="ข้อความ..." v-model="modalStore.textUserInput"
                            class="h-44 w-[70%] px-2 py-1 mt-2 shadow-lg rounded-lg" maxlength="175" />

                        </div>
                      </div>
                    </template>


                  </div>
                </template>

                <template v-else-if="uiStore.is_activeTemplateMessage">
                  <BodyTemplate />
                </template>

              </template>

              <!--END BODY-->
              <template #footer>
                <template v-if="uiStore.is_createTemplateMessage">
                  <div class="flex items-center justify-center">
                    <button @click="uiStore.activeEditTemplateMessage"
                      class="py-3 px-8 rounded-3xl text-xl bg-[#00ABB3] text-white">ถัดไป</button>
                  </div>
                </template>
                <template v-if="uiStore.is_editTemplateMessage">
                  <div class="flex items-center justify-center">
                    <button @click="modalStore.actionsCreateTemplate" v-if="modalStore.showButtonCreateTemplate"
                      class="py-3 px-4 rounded-2xl bg-[#00ABB3] text-white text-xl">สร้างเทมเพลต</button>
                  </div>
                </template>
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
          @click="uiStore.activeTemplateMessage" class="flex">
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

import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'



import ModalTemplateChat from '@/components/ModalTemplateChats/ModalTemplateChat.vue'
import HeaderTemplate from '@/components/ModalTemplateChats/MessageTemplate/HeaderTemplate.vue'
import BodyTemplate from '@/components/ModalTemplateChats/MessageTemplate/BobyTemplate.vue'
import HeaderCreateMessage from '@/components/ModalTemplateChats/CreateMessageTemplate/HeaderCreateMessage.vue'
import BodyCreateMessage from '@/components/ModalTemplateChats/CreateMessageTemplate/BodyCreateMessage.vue'

import TemplateTextImage from './ModalTemplateChats/TemplateType/TemplateTextImage.vue';
import TemplateButton from './ModalTemplateChats/TemplateType/TemplateButton.vue';
import { useUIStore } from '@/stores/UI';
import { useModalStore } from '@/stores/modal';
import type { Conversation } from '@/types/conversation';
import { storeToRefs } from 'pinia';
import { ref, watch, type Ref, computed } from 'vue'

defineProps<{
  platform: String
}>()

const onSelectEmoji = (emoji: any) => {
  console.log(emoji);
  newMessage.value += emoji.i;
}

const modalStore = useModalStore()
const uiStore = useUIStore()
const titleUserInput = ref('')
const textUserInput = ref('')
const newMessage = ref('');
const showSendMessageButton = ref(false);
const livechatStore = useLivechatStore()
const { currentChat } = storeToRefs(livechatStore)
let typingTimeout: number | undefined = undefined;
const isTyping = ref(false)
const isShowEmojiPicker = ref(false)



const calculateTextareaRows = computed(() => {
  const lineHeight = 20; // Adjust this value based on your font size and line height
  const maxRows = 5; // Set the maximum number of rows you want to show before enabling scrolling
  const numRows = Math.min(Math.ceil(newMessage.value.length / 50), maxRows); // Adjust the division value to control the number of characters per row
  const calculatedRows = numRows > 1 ? numRows : 2; // Ensure a minimum of 2 rows to display when there's no text or very little text

  return calculatedRows;
});

//mix use in Modal
const selecImage = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();
  input.addEventListener('change', (event) => {
    handleFileSelect(event);
  });
}

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      modalStore.imagePreview = reader.result as string;
      modalStore.selectedFile = file;
    };
    reader.readAsDataURL(file);
  }
}

const getImageFilename = () => {
  if (modalStore.imagePreview && modalStore.selectedFile) {
    return modalStore.selectedFile.name;
  }
  return '';
}

// boom use in MessageSender
const openImageDialog = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => handleFileChange(event);
  input.click();
};


const sendMessage = async () => {
  if (images.value.length > 0) {
    let a = currentChat.value?.conversation!
    for (let i = 0; i < images.value.length; i++) {
      await livechatStore.sendImageMessage(currentChat.value!.conversation, images.value[i].file)
      console.log('sended')
    }
    images.value = []
  }
  else if (newMessage.value.trim() !== '') {
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
