import type IBotioLivechat from "@/types/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import axios from "axios";
import { conversationsMap2SortedArray, type ConversationsMap } from "./ConversationsMap";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  conversationRaw: Map<string, ConversationsMap>;
  currentChat: { conversation: Conversation, messages: Message[] } | null
  chats: Map<string, { conversation: Conversation, messages: Message[] }>;
  shopID: string
  constructor(botioRestApiUrl: string, botioWebsocketApiUrl: string, shopID: string) {
    this.shopID = shopID;
    this.botioRestApiUrl = botioRestApiUrl;
    this.botioWebsocketApiUrl = botioWebsocketApiUrl;
    this.chats = new Map<string, { conversation: Conversation, messages: Message[] }>()
    this.conversationRaw = new Map<string, ConversationsMap>([
      ["facebook", new Map<string, Conversation>()],
      ["line", new Map<string, Conversation>()],
    ])
    this.currentChat = null
  }
  async addReceivedMessage(message: Message): Promise<void> {
    let conversation = this.getConversation(message.platform, message.pageID, message.conversationID)
    if (conversation === null) {
      conversation = await this.fetchConversation(message.platform, message.pageID, message.conversationID)
      if (conversation === null) {
        throw new Error("Error fetching conversation")
      }
    }
    conversation.updatedTime = message.timestamp
    conversation.lastActivity = message.timestamp.toString()
    const chat = this.chats.get(message.conversationID)
    if (chat === undefined) {
      return
    }
    console.log('push')
    chat.messages.push(message)
  }
  fetchConversation: (platform: string, pageID: string, conversationId: string) => Promise<Conversation | null> = async (platform: string, pageID: string, conversationId: string) => {
    let conversation: Conversation | null = null;
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}`;
    try {
      const response = await axios.get<{ conversation: Conversation }>(url);
      conversation = response.data.conversation;
    } catch (error) {
      throw new Error("Error fetching conversation");
    }
    return conversation;
  };
  getConversations: (platform: string) => Conversation[] = (platform: string) => {
    const conversationMap = this.conversationRaw.get(platform);
    if (conversationMap === undefined) {
      throw new Error("Invalid platform");
    }
    const conversations: Conversation[] = [];
    return conversationsMap2SortedArray(conversationMap);
  };
  getMessages: (platform: string, pageID: string, conversationId: string) => Promise<Message[]> = async (platform: string, pageID: string, conversationId: string) => {
    const chat = this.chats.get(conversationId);
    if (chat !== undefined) {
      return chat.messages;
    }
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
    const conversationMap = this.conversationRaw.get(platform)
    if (conversationMap === undefined) {
      throw new Error("Error fetching conversation conversationMap not found");
    }
    conversations.map((conversation) => {
      conversationMap.set(conversation.conversationID, conversation);
      return conversation;
    })
    return conversations;
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
  getConversation: (platform: string, pageID: string, conversationId: string) => Conversation | null = (platform: string, pageID: string, conversationId: string) => {
    const conversationMap = this.conversationRaw.get(platform);
    if (conversationMap === undefined) {
      throw new Error("Invalid platform");
    }
    const conversation = conversationMap.get(conversationId);
    if (conversation === undefined) {
      return null;
    }
    return conversation;
  };
  getMessage: (platform: string, conversationId: string, messageId: string) => Promise<Message | null> = async (platform: string, conversationId: string, messageId: string) => {
    return null
  };
  sendTextMessage: (platform: string, conversationId: string, text: string) => Promise<Message | null> = async (platform: string, conversationId: string, text: string) => {
    return null
  };
}

export { BotioLivechat }
