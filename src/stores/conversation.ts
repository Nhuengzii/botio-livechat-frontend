import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import BotioLivechat from "@/lib/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type IBotioLivechat from "@/types/BotioLivechat/IBotioLivechat";
import { defineStore } from "pinia";
import { useShopStore } from "./shop";
import type { Message } from "@/types/message";
import { useEventBus, type UseEventBusReturn } from "@vueuse/core";
import { messageToActivity } from "@/lib/utils";
type ConversationMap = Map<string, Conversation>;

interface IConversationStore {
  conversationsRaw: ConversationMap,
  receiveMessageEventBus: UseEventBusReturn<Message, any>
}
export type ConversationStore = ReturnType<typeof useConversationStore>;
export const useConversationStore = defineStore("conversation", {
  state: (): IConversationStore => ({
    conversationsRaw: new Map() as ConversationMap,
    receiveMessageEventBus: useEventBus<Message>('receiveMessage')
  }),
  getters: {
    conversations: (state) => ((platform: string) => {
      return conversationsMap2SortedArray(state.conversationsRaw, platform);
    }),
    conversation: (state) => ((platform: string, conversationID: string) => {
      return state.conversationsRaw.get(conversationID)
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
    },
    async addReceivedMessage(message: Message) {
      const shopStore = useShopStore();
      const { platform, conversationID, shopID, pageID } = message;
      const botioLivechatClient: IBotioLivechat = new BotioLivechat(shopID)
      if (message.isDeleted) {
        return;
      }
      let conversation: Conversation | undefined = this.conversation(platform, conversationID)
      for (let i = 0; i < 3; i++) {
        if (conversation === undefined) {
          conversation = await botioLivechatClient.getConversation(platform, pageID, conversationID) ?? undefined
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
        break;
      }
      if (conversation === undefined) {
        return;
      }
      botioLivechatClient.getAllPlatformInformation().then((info) => {
        for (let i = 0; i < info.statuses.length; i++) {
          shopStore.platform_informations.set(info.statuses[i].platform, {
            unread_conversations: info.statuses[i].unreadConversations,
            all_conversations: info.statuses[i].allConversations,
          })
        }
      }).catch((err) => {
        console.error("error when fetching platform information", err)
      })
      conversation.lastActivity = messageToActivity(message)
      this.conversationsRaw.set(conversationID, conversation)
      this.receiveMessageEventBus.emit(message)
    }
  }
})
