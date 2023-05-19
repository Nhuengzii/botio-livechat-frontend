<template>
  <!-- container chat center -->
  <ChatCenter />
  <!--End container chat center -->

  <!--container chat right-->
  <ChatRight />
  <!--End container chat right-->
</template>

<script setup lang="ts">
import ChatCenter from '@/components/ChatCenter.vue';
import ChatRight from '@/components/ChatRight.vue';
import { useMessageStore } from '@/stores/messages';
import { useConversationStore } from '@/stores/conversation';
const messsageStore = useMessageStore();
const conversationStore = useConversationStore();
</script>

<style scoped></style>
