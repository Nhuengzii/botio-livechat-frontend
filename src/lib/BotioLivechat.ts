import type IBotioLivechat from "@/types/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import axios from "axios";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  constructor(botioRestApiUrl: string, botioWebsocketApiUrl: string) {
    this.botioRestApiUrl = botioRestApiUrl;
    this.botioWebsocketApiUrl = botioWebsocketApiUrl;
  }
  getConversations: (platform: string) => Promise<Conversation[]> = async (platform: string) => {
    return []
  };
  getMessages: (platform: string, conversationId: string) => Promise<Message[]> = async (platform: string, conversationId: string) => {
    const messages = await this.fetchMessages(platform, conversationId);
    return messages;
  };
  fetchConversations: (platform: string) => Promise<Conversation[]> = async (platform: string) => {
    let conversations: Conversation[];
    const pageID: string = "108362942229009";
    const shopID: string = "1";
    const url: string = `${this.botioRestApiUrl}/shops/${shopID}/${platform}/${pageID}/conversations`;
    try {
      const response = await axios.get<Conversation[]>(url);
      conversations = response.data;
    } catch (error) {
      throw new Error("Error fetching conversations");
    }
    return conversations
  };
  fetchMessages: (platform: string, conversationId: string) => Promise<Message[]> = async (platform: string, conversationId: string) => {
    let messages: Message[];
    const pageID: string = "108362942229009";
    const shopID: string = "1";
    const url: string = `${this.botioRestApiUrl}/shops/${shopID}/${platform}/${pageID}/conversations/${conversationId}/messages`;
    try {
      const response = await axios.get<Message[]>(url);
      messages = response.data;
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
