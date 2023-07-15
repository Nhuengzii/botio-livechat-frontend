import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import type { Conversation } from "@/types/conversation";
import { defineStore } from "pinia";
type ConversationMap = Map<string, Conversation>;

interface IConversationStore {
  conversationsRaw: ConversationMap;
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

  }
})
