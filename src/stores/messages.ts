
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useConversationStore } from "./conversation";


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

export const useMessageStore = defineStore("message", () => {
  const messages = ref<Message[]>([]);
  function fetchMessages(conversationId: string) {
    if (conversationId !== "1") {
      messages.value = [];
      return
    }
    const mockMessage: Message[] = [
      {
        shopId: "1",
        pageId: "1",
        conversationId: "1",
        messageId: "1",
        message: "Hello",
        timeStamp: 234789,
        source: {
          sourceId: "1",
          sourceName: "Boom",
          sourcePicture: "https://avatars.githubusercontent.com/u/124413969?v=4",
          sourceType: "USER",
        }
      },
      {
        shopId: "1",
        pageId: "1",
        conversationId: "1",
        messageId: "2",
        message: "ไง",
        timeStamp: 2347089,
        source: {
          sourceId: "2",
          sourceType: "ADMIN",
        }
      },
      {
        shopId: "1",
        pageId: "1",
        conversationId: "1",
        messageId: "3",
        message: "อืมมมมม",
        timeStamp: 23470089,
        source: {
          sourceId: "1",
          sourceName: "Boom",
          sourcePicture: "https://avatars.githubusercontent.com/u/124413969?v=4",
          sourceType: "USER",
        }
      },
    ];
    messages.value = mockMessage;
  }
  return { messages, fetchMessages }
})
