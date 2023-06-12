import { defineStore } from "pinia";
import { BotioLivechat } from "@/lib/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import type { ConversationsMap } from "@/lib/ConversationsMap";
import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import { ChatStorage } from "@/lib/ChatStorage";


export const useLivechatStore = defineStore("livechat", {
  state: () => ({
    botioLivechat: new BotioLivechat("https://y5gagaucrg.execute-api.ap-southeast-1.amazonaws.com/dev", ""),
    conversationsRaw: new Map<string, ConversationsMap>([
      ["facebook", new Map<string, Conversation>()],
      ["line", new Map<string, Conversation>()],
    ]),
  }),
  getters: {
    conversations: (state) => (platform: string): Conversation[] => {
      const conversationsMap = state.conversationsRaw.get(platform);
      if (conversationsMap === undefined) {
        return [];
      }
      let conversations = conversationsMap2SortedArray(conversationsMap);
      if (conversations.length === 0) {
        state.botioLivechat.fetchConversations(platform).then(
          (conversations) => {
            conversations.forEach((conversation) => {
              conversationsMap.set(conversation.conversationID, conversation);
            });
          }
        );
      }
      return conversations;
    },
  },
  actions: {
    async getMessages(platform: string, conversationId: string): Promise<Message[]> {
      const conversationsMap = this.conversationsRaw.get(platform);
      if (conversationsMap === undefined) {
        throw new Error("Invalid platform");
      }
      const conversation = conversationsMap.get(conversationId);
      if (conversation === undefined) {
        throw new Error("Invalid conversationId");
      }
      return await this.botioLivechat.getMessages(platform, conversationId);
    }

  }
});

