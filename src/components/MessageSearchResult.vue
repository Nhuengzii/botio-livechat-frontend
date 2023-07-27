<template>
  <div>
    <template v-if="ready">
      <div v-if="messages.length > 0" v-for="message in messages">
        <MessageBlock :message="message" :conversation="conversation" :is-show-profile="message.source.userType == 'user'"
          :query="query" v-if="message.attachments.length == 0" />
      </div>
      <div v-else class="flex justify-center">
        No more data found!
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/message"
import type { Conversation } from "@/types/conversation"
import { onMounted, ref } from "vue";
const { conversation, query } = defineProps<{ conversation: Conversation, query: string }>()
const messages = ref([] as Message[])
const ready = ref(false)
import MessageBlock from "@/components/MessageBlock.vue"
import BotioLivechat from "@/lib/BotioLivechat";
import { useShopStore } from "@/stores/shop";
const shopStore = useShopStore()
const botioLivechat = new BotioLivechat(shopStore.shop_id)
onMounted(async () => {
  const resultMessage = await botioLivechat.searchMessageByText(conversation, query)
  messages.value.push(...resultMessage)
  ready.value = true
})
</script>

<style scoped></style>
