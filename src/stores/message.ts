import BotioLivechat from "@/lib/BotioLivechat2";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import { useEventBus, type UseEventBusReturn } from "@vueuse/core";
import { defineStore } from "pinia";
type Chat = { conversation: Conversation, messages: Message[], isFetching: boolean };

interface IMessageStore {
  currentChat?: Chat,
  openChatEventBus: UseEventBusReturn<Conversation, any>
}
export const useMessageStore = defineStore("message", {
  state: (): IMessageStore => ({
    currentChat: undefined,
    openChatEventBus: useEventBus<Conversation>('openChatEventBus')
  }),
  actions: {
    async openChat(conversation: Conversation) {
      if (this.currentChat?.isFetching && this.currentChat.conversation.conversationID === conversation.conversationID) {
        return
      }
      this.currentChat = { conversation, messages: [], isFetching: true };
      const { shopID, pageID, platform, conversationID } = conversation
      const botioLivechat = new BotioLivechat(shopID);
      const messages = await botioLivechat.listMessage(platform, pageID, conversationID, 0, 30)
      botioLivechat.markAsRead(platform, pageID, conversationID)
      this.currentChat.messages = messages
      this.currentChat.isFetching = false
    },
    async fetchMoreMessages() {
      if (this.currentChat === undefined) {
        return
      }
      const { pageID, conversationID, platform, shopID } = this.currentChat.conversation
      const botioLivechat = new BotioLivechat(shopID);
      const skip = this.currentChat.messages.length
      const newMessages = await botioLivechat.listMessage(platform, pageID, conversationID, skip, 30)
      this.currentChat.messages.unshift(...(newMessages.filter((message) => {
        const exitst = this.currentChat?.messages.find((m) => m.messageID === message.messageID);
        return !exitst;
      })));
      console.log('fetching done')
      return newMessages;
    },
    closeAllChat() {
      this.currentChat = undefined
    },
    closeChat(conversationID: string) {
      if (this.currentChat?.conversation.conversationID === conversationID) {
        this.currentChat = undefined;
      }
    }
  }
})
