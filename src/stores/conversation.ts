import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import BotioLivechat from "@/lib/BotioLivechat2";
import type { Conversation } from "@/types/conversation";
import type IBotioLivechat from "@/types/BotioLivechat/IBotioLivechat";
import { defineStore } from "pinia";
import { useShopStore } from "./shopStore";
type ConversationMap = Map<string, Conversation>;

interface IConversationStore {
  conversationsRaw: ConversationMap,
}

export const useConversationStore = defineStore("conversation", {
  state: (): IConversationStore => ({
    conversationsRaw: new Map() as ConversationMap,
  }),
  getters: {
    conversations: (state) => ((platform: string) => {
      return conversationsMap2SortedArray(state.conversationsRaw, platform);
    })
  },
  actions: {
    async fetchConversations(platform: string, skip: number, limit: number) {
      const shopStore = useShopStore();
      const page_id = shopStore.pageID(platform);
      const shopID = shopStore.shop_id;
      const botioLivechatClient: IBotioLivechat = new BotioLivechat(shopID)
      if (!page_id) return [];
      try {
        const fetchedConversations = await botioLivechatClient.listConversation(platform, page_id, skip, limit);
        if (fetchedConversations === undefined || fetchedConversations.length == 0) {
          return [];
        }
        fetchedConversations.forEach((conversation) => {
          this.conversationsRaw.set(conversation.conversationID, conversation);
        })
        return fetchedConversations;
      } catch (error) {
        console.error(`cannot fetch conversations of platform: ${platform} pageID: ${page_id} shopID: ${shopID}`, error)
        return []
      }
    }
  }
})
