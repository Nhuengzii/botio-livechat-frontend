import type IBotioLivechat from "@/types/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import { ChatStorage } from "@/lib/ChatStorage";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  private _chatStorage: ChatStorage;
  constructor(botioRestApiUrl: string, botioWebsocketApiUrl: string) {
    this.botioRestApiUrl = botioRestApiUrl;
    this.botioWebsocketApiUrl = botioWebsocketApiUrl;
    this._chatStorage = new ChatStorage(100);
  }
  getConversations: (platform: string) => Promise<Conversation[]> = async (platform: string) => {
    return []
  };
  getMessages: (platform: string, conversationId: string) => Promise<Message[]> = async (platform: string, conversationId: string) => {
    return [];
  };
  fetchConversations: (platform: string) => Promise<Conversation[]> = async (platform: string) => {
    return []
  };
  fetchMessages: (platform: string, conversationId: string) => Promise<Message[]> = async (platform: string, conversationId: string) => {
    return []
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
