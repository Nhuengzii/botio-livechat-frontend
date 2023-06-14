import { defineStore } from "pinia";
import { BotioLivechat } from "@/lib/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import type { ConversationsMap } from "@/lib/ConversationsMap";
import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import { useEventBus } from "@vueuse/core";

const rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID;
if (rest_api_id === undefined) {
  throw new Error("VITE_REST_API_ID is undefined");
}
const websocket_api_id = import.meta.env.VITE_BOTIO_WEBSOCKET_API_ID;
if (websocket_api_id === undefined) {
  throw new Error("VITE_WEBSOCKET_API_ID is undefined");
}

export const useLivechatStore = defineStore("livechat", {
  state: () => ({
    botioLivechat: new BotioLivechat(`https://${rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`, `wss://${websocket_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`, "1"),
    pageIDs: new Map<string, string>([
      ["facebook", "108362942229009"],
      ["line", "U6972d1d58590afb114378eeab0b08d52"],
    ]),
    openChatEventBus: useEventBus<Conversation>('openChatEventBus'),
  }),
  getters: {
    conversations: (state) => (platform: string): Conversation[] => {
      const conversations = state.botioLivechat.getConversations(platform);
      return conversations;
    }, currentChat: (state) => {
      return state.botioLivechat.currentChat
    }
  },
  actions: {
    openChat(conversation: Conversation) {
      if (this.botioLivechat.currentChat !== null) {
        this.botioLivechat.currentChat.conversation = conversation
        this.botioLivechat.currentChat.messages = []
      }
      else {
        this.botioLivechat.currentChat = { conversation, messages: [] }
      }
      this.openChatEventBus.emit(conversation);
    }
  }
});

