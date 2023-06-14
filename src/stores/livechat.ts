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
    receivedMessageEventBus: useEventBus<Message>('receivedMessageEventBus'),
    conversationRaw: new Map<string, ConversationsMap>([
      ["facebook", new Map<string, Conversation>()],
      ["line", new Map<string, Conversation>()],
    ]),
    currentChat: null as { conversation: Conversation, messages: Message[] } | null,
    conversationTimestamp: new Date().getTime(),
    searchResult: [] as Conversation[]
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
      conversation.lastActivity = messageToActivity(message)
      if (this.currentChat) {
        if (this.currentChat.conversation.conversationID === conversation.conversationID) {
          conversation.isRead = true
        } else {
          conversation.isRead = false
        }
      } else {
        conversation.isRead = false
      }
      this.updateConversation(conversation)
    }, async sendMessage(platform: string, pageID: string, conversationID: string, psid: string, text: string) {
      await this.botioLivechat.sendTextMessage(platform, conversationID, pageID, psid, text)
      const newMessage: Message = {
        platform: platform,
        pageID: pageID,
        shopID: this.botioLivechat.shopID,
        conversationID: conversationID,
        timestamp: new Date().getTime(),
        source: {
          userType: "admin",
          userID: "1",
        },
        messageID: new Date().getTime().toString(),
        message: text,
        attachments: [],
        replyTo: undefined,
      }
      this.receivedMessageEventBus.emit(newMessage)
    },
    async searchConversations(platform: string, query: string): Promise<Conversation[]> {
      const res = this.conversations(platform).filter((conversation) => {
        conversation.participants[0].username.toLowerCase().includes(query.toLowerCase())
      })
      this.searchResult = res
      return res;
    }
  }
});
function messageToActivity(message: Message): string {
  if (message.message.length > 0) {
    if (message.source.userType === "user") {
      return message.message;
    } else if (message.source.userType === "admin") {
      return "คุณ: " + message.message;
    } else {
      return `WTF ${message.source.userType} พิมพ์ข้อความ`
    }
  } else if (message.attachments.length > 0) {
    if (message.attachments[0].attachmentType === "image") {
      if (message.source.userType === "user") {
        return "ส่งรูปภาพ";
      } else if (message.source.userType === "admin") {
        return "คุณส่งรูปภาพ";
      } else {
        return `WTF ${message.source.userType} ส่งรูปภาพ`
      }
    }
  } else {
    return "WTF";
  }
  return "wwwwwwwwwwwwwwwwwwwwwwwww"
}

