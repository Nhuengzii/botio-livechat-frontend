import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'

type Participant = {
  userId: string,
  username: string,
  profilePicture: string,
}

type Source = {
  sourceId: string,
  sourceName?: string
  sourcePicture?: string,
  sourceType: "USER" | "ADMIN",
}

type Message = {
  shopId: string,
  pageId: string,
  conversationId: string,
  messageId: string,
  message: string,
  timeStamp: number,
  source: Source,
}
type Conversation = {
  shopId: string,
  pageId: string,
  conversationId: string,
  conversationPicture: string,
  updatedAt: number,
  lastActivity: string,
  participants: Participant[],
  messages: Record<string, Message>,
}

export const useConversationStore = defineStore("conversation", () => {
  const conversations = ref<Conversation[]>([]);
  function getConversationById(conversationId: string) {
    return computed(() => conversations.value.find((conversation) => conversation.conversationId === conversationId));
  }
  return { conversations, getConversationById }
});

