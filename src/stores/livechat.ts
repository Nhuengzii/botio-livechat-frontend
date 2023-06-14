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
    conversationRaw: new Map<string, ConversationsMap>([
      ["facebook", new Map<string, Conversation>()],
      ["line", new Map<string, Conversation>()],
    ]),
    currentChat: null as { conversation: Conversation, messages: Message[] } | null,
    conversationTimestamp: new Date().getTime()
  }),
  getters: {
    conversations: (state) => (platform: string): Conversation[] => {
      const conversationsMap = state.conversationRaw.get(platform);
      console.log(`force update conversations ${platform} ${state.conversationTimestamp}`);
      if (conversationsMap === undefined) {
        throw new Error("conversationsMap is undefined");
      }
      return conversationsMap2SortedArray(conversationsMap);
    }
  },
  actions: {
    openChat(conversation: Conversation) {
      if (this.currentChat) {
        this.currentChat.conversation = conversation;
        this.currentChat.messages = [];
      }
      else {
        this.currentChat = { conversation: conversation, messages: [] };
      }
      this.openChatEventBus.emit(conversation);
    },
    async fetchConversations(platform: string): Promise<void> {
      const conversations = await this.botioLivechat.fetchConversations(platform, this.pageIDs.get(platform)!);
      if (conversations === null) {
        throw new Error("Error fetching conversations");
      }
      const conversationsMap = this.conversationRaw.get(platform);
      if (conversationsMap === undefined) {
        throw new Error("conversationsMap is undefined");
      }
      conversations.forEach((conversation) => {
        conversationsMap.set(conversation.conversationID, conversation);
      });
    }, updateConversation(conversation: Conversation) {
      this.conversationTimestamp = new Date().getTime()
      this.conversationRaw.get(conversation.platform)?.set(conversation.conversationID, conversation);
    },
    async addReceivedMessage(message: Message): Promise<void> {
      let conversation = this.botioLivechat.getConversation(message.platform, message.pageID, message.conversationID)
      if (conversation === null) {
        console.log('let me fetcging');

        conversation = await this.botioLivechat.fetchConversation(message.platform, message.pageID, message.conversationID)
        if (conversation === null) {
          throw new Error("Error fetching conversation")
        }
      }
      conversation.updatedTime = message.timestamp
      conversation.lastActivity = message.timestamp.toString()
      this.updateConversation(conversation)
    }
  }
});

