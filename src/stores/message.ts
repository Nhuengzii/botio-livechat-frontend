import BotioLivechat from "@/lib/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { AttachmentForSending, Message } from "@/types/message";
import { useEventBus, type UseEventBusReturn } from "@vueuse/core";
import { defineStore } from "pinia";
import { useUIStore } from "./UI";
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
      return newMessages;
    },
    closeAllChat() {
      this.currentChat = undefined
    },
    closeChat(conversationID: string) {
      if (this.currentChat?.conversation.conversationID === conversationID) {
        this.currentChat = undefined;
      }
    },
    addMessage(message: Message) {
      if (this.currentChat?.conversation.conversationID !== message.conversationID) {
        return;
      }
      const exitst = this.currentChat?.messages.find((m) => m.messageID === message.messageID);
      if (exitst) {
        return;
      }
      this.currentChat.messages.push(message)
    },
    async sendTextMessage(conversation: Conversation, text: string) {
      const botioLivechat = new BotioLivechat(conversation.shopID)
      if (this.currentChat?.conversation.conversationID == conversation.conversationID) {
        const tempMid = `temp-${Date.now()}`;
        const tempMessage: Message = {
          shopID: conversation.shopID,
          platform: conversation.platform,
          pageID: conversation.pageID,
          conversationID: conversation.conversationID,
          messageID: tempMid,
          timestamp: Date.now(),
          source: {
            userType: "admin",
            userID: "ADMIN",
          },
          message: text,
          isDeleted: false,
          attachments: []
        }
        this.currentChat.messages.push(tempMessage)
        try {

          const newMessage = await botioLivechat.sendTextMessage(conversation.platform, conversation.conversationID, conversation.pageID, conversation.participants[0].userID, text)
          const idx = this.currentChat.messages.findIndex((message) => message.messageID === tempMid);
          if (idx != -1) {
            console.log('replace temp message')
            this.currentChat.messages[idx] = newMessage;
          }
        } catch (err) {
          console.log(err)
          const idx = this.currentChat.messages.findIndex((message) => message.messageID === tempMid);
          if (idx != -1) {
            // remove temp message
            this.currentChat.messages.splice(idx, 1);
          }
        }
      }
      else {
        const newMessage = await botioLivechat.sendTextMessage(conversation.platform, conversation.conversationID, conversation.pageID, conversation.participants[0].userID, text)
      }
    },
    async sendImageMessage(conversation: Conversation, imageFile: File) {
      const botioLivechat = new BotioLivechat(conversation.shopID)
      if (this.currentChat?.conversation.conversationID == conversation.conversationID) {
        const tempMid = `temp-${Date.now()}`;
        const tempMessage: Message = {
          shopID: conversation.shopID,
          platform: conversation.platform,
          pageID: conversation.pageID,
          conversationID: conversation.conversationID,
          messageID: tempMid,
          timestamp: Date.now(),
          source: {
            userType: "admin",
            userID: "ADMIN",
          },
          message: '',
          isDeleted: false,
          attachments: [{
            attachmentType: 'image',
            payload: {
              src: URL.createObjectURL(imageFile),
            }
          }]
        }
        this.currentChat.messages.push(tempMessage)
        try {
          const newMessage = await botioLivechat.sendImageMessage(conversation.platform, conversation.conversationID, conversation.pageID, conversation.participants[0].userID, imageFile)
          const idx = this.currentChat.messages.findIndex((message) => message.messageID === tempMid);
          if (idx != -1) {
            console.log('replace temp message')
            this.currentChat.messages[idx] = newMessage;
          }
        } catch (error) {
          console.log(error)
          const idx = this.currentChat.messages.findIndex((message) => message.messageID === tempMid);
          if (idx != -1) {
            // delete temp message from array
            this.currentChat.messages.splice(idx, 1);
          }
        }
      }
    },
    async sendAttachmentMessage(conversation: Conversation, attachment: AttachmentForSending) {
      const botioLivechat = new BotioLivechat(conversation.shopID)
      await botioLivechat.sendAttachmentMessage(conversation.platform, conversation.conversationID, conversation.pageID, conversation.participants[0].userID, attachment)
    },
  }
})
