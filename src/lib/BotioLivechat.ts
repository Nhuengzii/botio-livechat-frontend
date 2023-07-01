import type { useLivechatStore } from "@/stores/livechat";
import type IBotioLivechat from "@/types/IBotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import axios from "axios";
import { conversationsMap2SortedArray, type ConversationsMap } from "./ConversationsMap";
import type { PageInformation } from "@/types/pageInformation";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  shopID: string;
  websocketClient: WebSocket | null = null;
  _startTimestamp: number = 0;
  constructor(botioRestApiUrl: string, botioWebsocketApiUrl: string, shopID: string, onmessageCallbacks: (data: MessageEvent<string>) => void) {
    this.botioRestApiUrl = botioRestApiUrl;
    this.botioWebsocketApiUrl = botioWebsocketApiUrl;
    this.shopID = shopID;
    this.connect(onmessageCallbacks);
  }
  connect(onmessageCallback: (event: MessageEvent<any>) => void) {
    this.websocketClient = new WebSocket(`${this.botioWebsocketApiUrl}?shopID=${this.shopID}`)
    this.websocketClient.onerror = (error) => {
      console.log(`websocket error: ${error}`);
    }
    this.websocketClient.onopen = () => {
      this._startTimestamp = Date.now()
      console.log('websocket connected');
    }
    this.websocketClient.onclose = () => {
      alert("websocket disconnected with duration: " + `${(Date.now() - this._startTimestamp) / 1000} seconds`)
      console.log('websocket disconnected');
      // reconnect
      this.connect(onmessageCallback);
    }
    this.websocketClient.onmessage = onmessageCallback;
  }
  /**
    * Return a PageInformation of a given platform and pageID
    * @param platform - Platform of the given page
    * @param pageID - ID of the page
    * @returns PageInformation of the page with given platform and pageID
    */
  async getPageInformation(platform: string, pageID: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}`;
    try {
      const response = await axios.get(url);
      const information: PageInformation = response.data;
      return information;
    } catch (error) {
      throw new Error("Error fetching platform information");
    }
  }
  /**
    * Return a list of Conversation of a given platform and pageID
    * @param platform - Platform of the given page
    * @param pageID - ID of the page
    * @param skip - Number of conversations to skip
    * @param limit - Number of conversations to return
    * @returns List of Conversation of the page with given platform and pageID
    */
  async listConversation(platform: string, pageID: string, skip: number = 0, limit: number = 50) {

    let conversations: Conversation[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}` + (platform !== 'all' ? `/${pageID}/conversations` : '/conversations');
    try {
      const response = await axios.get<{ conversations: Conversation[] }>(url, { params: { skip: skip, limit: limit } });
      conversations = response.data.conversations;
    } catch (error) {
      throw new Error("Error fetching conversations");
    }
    return conversations;
  }
  /**
    * Return a Conversation of a given platform, pageID and conversationID
    * @param platform - Platform of the given page
    * @param pageID - ID of the page
    * @param conversationId - ID of the conversation
    * @returns Conversation of the page with given platform, pageID and conversationID
    */
  async getConversation(platform: string, pageID: string, conversationId: string) {
    let conversation: Conversation | null = null;
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}`;
    for (let i = 0; i < 3; i++) {
      try {
        const response = await axios.get<{ conversation: Conversation }>(url);
        conversation = response.data.conversation;
      } catch (error) {
        console.log(`failed get conversation ${conversationId} from ${platform} ${pageID} ${i} times`)
        if (i === 2) {
          throw new Error("Error fetching conversation");
        }
      }
    }
    return conversation;
  }

  /**
  * Return a list of Message of a given platform, pageID and conversationID
  * @param platform - Platform of the given page
    * @param pageID - ID of the page
    * @param conversationId - ID of the conversation
    * @param skip - Number of messages to skip
    * @param limit - Number of messages to return
    * @returns List of Message of the page with given platform, pageID and conversationID
  */
  async listMessage(platform: string, pageID: string, conversationId: string, skip: number = 0, limit = 20) {
    let messages: Message[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationId}/messages`;

    try {
      const response = await axios.get<{ messages: Message[] }>(url, { params: { skip: skip, limit: limit } });
      messages = response.data.messages;
    }
    catch (error) {
      throw new Error("Error fetching messages");
    }
    return messages.reverse();
  };

  async getMessage(platform: string, pageID: string, conversationId: string) {
    return null
  }

  /**
  * Return a Message delivered to a given platform, pageID and conversationID
  * @param platform - Platform of the given page
    * @param pageID - ID of the page
    * @param conversationId - ID of the conversation
    * @param psid - PSID of the user
    * @param text - Text of the message
    * @returns Message delivered to the page with given platform, pageID and conversationID
  */
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

  async searchConversationByName(platform: string, pageID: string, name: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}` + (platform != 'all' ? `/${pageID}/conversations/` : `/conversations`);
    const res = await axios.get<{ conversations: Conversation[] }>(url, { params: { filter: JSON.stringify({ with_participants_username: name }) } })
    return res.data.conversations
  }
  async searchConversationByMessage(platform: string, pageID: string, message: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}` + (platform != 'all' ? `/${pageID}/conversations/` : `/conversations`);
    const res = await axios.get<{ conversations: Conversation[] }>(url, { params: { filter: JSON.stringify({ with_message: message }) } })
    return res.data.conversations
  }

  async searchMessageByText(conversation: Conversation, text: string) {
    const { conversationID, pageID, platform } = conversation
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}/messages`
    const res = await axios.get<{ messages: Message[] }>(url, { params: { filter: JSON.stringify({ with_message: text }) } })
    return res.data.messages
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
  async markAsRead(platform: string, pageID: string, conversationID: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}`;
    const body = {
      unread: 0,
    }
    const { data } = await axios.patch(url, body);
    console.log(`patch seccess ${data}`)
  }
}

export { BotioLivechat };
