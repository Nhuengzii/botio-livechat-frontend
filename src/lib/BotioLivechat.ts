import type IBotioLivechat from "@/types/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import axios from "axios";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  shopID: string
  constructor(botioRestApiUrl: string, botioWebsocketApiUrl: string, shopID: string) {
    this.shopID = shopID;
    this.botioRestApiUrl = botioRestApiUrl;
    this.botioWebsocketApiUrl = botioWebsocketApiUrl;
  }
  getConversations: (platform: string) => Promise<Conversation[]> = async (platform: string) => {
    return []
  };
  getMessages: (platform: string, pageID: string, conversationId: string) => Promise<Message[]> = async (platform: string, pageID: string, conversationId: string) => {
    const messages = await this.fetchMessages(platform, pageID, conversationId);
    return messages;
  };
  fetchConversations: (platform: string, pageID: string) => Promise<Conversation[]> = async (platform: string, pageID: string) => {
    let conversations: Conversation[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations`;

    try {
      const response = await axios.get<{ conversations: Conversation[] }>(url);
      conversations = response.data.conversations;
    } catch (error) {
      throw new Error("Error fetching conversations");
    }
    return conversations
  };
  fetchMessages: (platform: string, pageID: string, conversationId: string) => Promise<Message[]> = async (platform: string, pageID: string, conversationId: string) => {
    let messages: Message[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}/messages`;

    try {
      const response = await axios.get<{ messages: Message[] }>(url);
      messages = response.data.messages;
      messages.map((message) => {
        message.platform = message.platform.toLowerCase();
        return message;
      })
    }
    catch (error) {
      throw new Error("Error fetching messages");
    }
    return messages
  };
  getConversation: (platform: string, conversationId: string) => Promise<Conversation | null> = async (platform: string, conversationId: string) => {
    return null
  };
  getMessage: (platform: string, conversationId: string, messageId: string) => Promise<Message | null> = async (platform: string, conversationId: string, messageId: string) => {
    return null
  };
  sendTextMessage: (platform: string, conversationId: string, text: string) => Promise<Message | null> = async (platform: string, conversationId: string, text: string) => {
    return null
  };
}

export { BotioLivechat }
