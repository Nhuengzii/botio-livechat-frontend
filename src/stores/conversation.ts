import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'

type Participant = {
  userID: string,
  username: string,
  profilePicture: string,
}

type Source = {
  sourceID: string,
  sourceName?: string
  sourcePicture?: string,
  sourceType: "USER" | "ADMIN",
}

type Message = {
  conversationId: string,
  messageID: string,
  timeStamp: number,
  source: Source,
  message: string,
}
type Conversation = {
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

