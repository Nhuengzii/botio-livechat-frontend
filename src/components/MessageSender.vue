<template>
  <div class="flex flex-[1]  py-4 items-center bg-white mx-3">
    
    <!-- space -->
    <div class="flex-[1]"></div>
    <!-- end space-->

    <div class="flex-[6] flex-col">
      <div class="flex bg-stone-300 rounded-[20px] justify-around items-center text-gray-500 py-4">
        
        <textarea type="text" placeholder="พิมพ์ข้อความ" v-model="newMessage" @keydown.enter="sendMessageOnEnter"
          class="inline-flex bg-stone-300 w-full h-4 ml-8 break-words outline-none" />

        <div class="inline-flex">
          <button @click="sendMessage">
            <div class="pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
            </div>
          </button>
            <div class="pl-4  text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
            </div>
            <div class="pl-4 mr-8  text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            </div>
          </div>
          
        </div>
      </div>

      <!-- space -->
      <div class="flex-[1]"></div>
      <!-- end space-->

  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/UI';
import { ref } from 'vue'
const uiStore = useUIStore()

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    // Handle sending the message here
    console.log('Sending message:', newMessage.value);

    newMessage.value = ''; // Reset the input field after sending the message
  }
};

const sendMessageOnEnter = (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior of the Enter key

    sendMessage(); // Call the sendMessage function to send the message
  }
};


</script>

<style scoped>
.background-d9 {
  background-color: rgba(217, 217, 217, 0.3);

}
</style>
