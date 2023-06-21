import type { useLivechatStore } from "@/stores/livechat";
import type IBotioLivechat from "@/types/IBotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import axios from "axios";
import { conversationsMap2SortedArray, type ConversationsMap } from "./ConversationsMap";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  shopID: string;
  websocketClient: WebSocket | null;
  constructor(botioRestApiUrl: string, botioWebsocketApiUrl: string, shopID: string) {
    this.botioRestApiUrl = botioRestApiUrl;
    this.botioWebsocketApiUrl = botioWebsocketApiUrl;
    this.shopID = shopID
    this.websocketClient = new WebSocket(`${this.botioWebsocketApiUrl}?shopID=${this.shopID}`)
    this.websocketClient.onopen = () => {
      console.log('websocket connected');
    }
    this.websocketClient.onclose = () => {
      console.log('websocket disconnected');
    }
    this.websocketClient.onerror = (error) => {
      console.log(`websocket error: ${error}`);
    }
  }

  async listConversation(platform: string, pageID: string) {

    let conversations: Conversation[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations`;
    try {
      const response = await axios.get<{ conversations: Conversation[] }>(url);
      conversations = response.data.conversations;
    } catch (error) {
      throw new Error("Error fetching conversations");
    }
    return conversations;
  }

  async getConversation(platform: string, pageID: string, conversationId: string) {
    let conversation: Conversation | null = null;
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}`;
    try {
      const response = await axios.get<{ conversation: Conversation }>(url);
      conversation = response.data.conversation;
    } catch (error) {
      throw new Error("Error fetching conversation");
    }
    return conversation;
  }

  async listMessage(platform: string, pageID: string, conversationId: string) {
    let messages: Message[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}/messages`;

    try {
      const response = await axios.get<{ messages: Message[] }>(url);
      messages = response.data.messages;
    }
    catch (error) {
      throw new Error("Error fetching messages");
    }
    return messages
  };

  async getMessage(platform: string, pageID: string, conversationId: string) {
    return null
  }

  async sendTextMessage(platform: string, conversationId: string, pageID: string, psid: string, text: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}/messages?psid=${psid}`;
    const body: { message: string } = { message: text }
    try {
      const response = await axios.post(url, body);
      const message: Message = {
        shopID: this.shopID,
        pageID: pageID,
        platform: platform,
        conversationID: conversationId,
        messageID: response.data.message_id,
        timestamp: response.data.timestamp ?? Date.now(),
        message: text,
        source: {
          userID: psid,
          userType: "admin",
        },
        isDeleted: false,
        attachments: [],
      }
      return message
    } catch (error) {
      console.log(error);
      throw new Error("Error sending message");
    }
  }

  broadcastMessage(platform: string, pageID: string, message: Message) {
    if (!this.websocketClient) {
      throw new Error("websocket not connected")
    }
    const body = {
      action: "broadcast",
      message: message,
    }
    this.websocketClient.send(JSON.stringify(body))
  }
}

export { BotioLivechat };
