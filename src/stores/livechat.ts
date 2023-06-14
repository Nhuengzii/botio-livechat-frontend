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
    conversationsRaw: new Map<string, ConversationsMap>([
      ["facebook", new Map<string, Conversation>()],
      ["line", new Map<string, Conversation>()],
    ]),
    pageIDs: new Map<string, string>([
      ["facebook", "108362942229009"],
      ["line", "U6972d1d58590afb114378eeab0b08d52"],
    ]),
    openChatEventBus: useEventBus<{ conversation: Conversation, messages: Message[] }>('openChatEventBus'),
    _chats: new Map<string, { conversation: Conversation, messages: Message[] }>(),
  }),
  getters: {
    conversations: (state) => (platform: string): Conversation[] => {
      const conversationsMap = state.conversationsRaw.get(platform);
      if (conversationsMap === undefined) {
        return [];
      }
      let conversations = conversationsMap2SortedArray(conversationsMap);
      if (conversations.length === 0) {
        state.botioLivechat.fetchConversations(platform, state.pageIDs.get(platform)!).then(
          (conversations) => {
            conversations.forEach((conversation) => {
              conversationsMap.set(conversation.conversationID, conversation);
            });
          }
        );
      }
      return conversations;
    }
  },
  actions: {
    async getMessages(platform: string, conversationId: string): Promise<Message[]> {
      const conversationsMap = this.conversationsRaw.get(platform);
      console.log(platform);
      if (conversationsMap === undefined) {
        throw new Error("Invalid platform");
      }
      const conversation = conversationsMap.get(conversationId);
      if (conversation === undefined) {
        throw new Error("Invalid conversationId");
      }
      return await this.botioLivechat.getMessages(platform, this.pageIDs.get(platform)!, conversationId);
    },
    async openChat(platform: string, conversationId: string): Promise<void> {
      const conversationsMap = this.conversationsRaw.get(platform);
      console.log(platform);
      if (conversationsMap === undefined) {
        throw new Error("Invalid platform");
      }
      const conversation = conversationsMap.get(conversationId);
      if (conversation === undefined) {
        throw new Error("Invalid conversationId");
      }
      const messages = await this.botioLivechat.getMessages(platform, this.pageIDs.get(platform)!, conversationId);
      this.openChatEventBus.emit({ conversation, messages });
      this._chats.set(conversationId, { conversation, messages });
    },
    closeChat(conversationID: string): void {
      try {
        this._chats.delete(conversationID);
      } catch (error) {
        throw new Error("Invalid conversationID");
      }
    },
    getChat(conversationID: string): { conversation: Conversation, messages: Message[] } | undefined {
      try {
        return this._chats.get(conversationID);
      } catch (error) {
        throw new Error("Invalid conversationID");
      }
    },
    addNewMessage(message: Message): void {
      const conversationsMap = this.conversationsRaw.get(message.platform);
      if (conversationsMap === undefined) {
        throw new Error("Invalid platform");
      }
      let conversation = conversationsMap.get(message.conversationID);
      if (conversation === undefined) {
        return;
      }
      conversation.updatedTime = message.timestamp
      const currentChat = this.getChat(message.conversationID);
      if (currentChat === undefined) {
        return;
      }
      currentChat.messages.push(message);
    }

  }
});

