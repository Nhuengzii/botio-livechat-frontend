import type IBotioLivechat from "@/types/BotioLivechat/IBotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { AttachmentForSending, Message } from "@/types/message";
import axios from "axios";
import type { AllPlatformInformation, PlatformInformation, ShopConfig, ShopInformation, ShopTemplate } from "@/types/ShopInformation";
import type { SendMessageResponse, ShopInformationResponse } from "@/types/BotioLivechat/RespondseBody";

class BotioLivechat implements IBotioLivechat {
  botioRestApiUrl: string;
  botioWebsocketApiUrl: string;
  shopID: string;
  websocketClient: WebSocket | null = null;
  _startTimestamp: number = 0;
  constructor(shopID: string) {
    const rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID
    if (!rest_api_id) {
      throw new Error("Cannot find VITE_BOTIO_WEBSOCKET_API_ID in .env");
    }
    this.botioRestApiUrl = `https://${rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`;
    this.botioWebsocketApiUrl = "";
    this.shopID = shopID;
  }
  async getShopInformation(shopID: string) {
    try {
      const res = await axios.get<ShopInformationResponse>(`${this.botioRestApiUrl}/shops/${shopID}`)
      const shopInformation: ShopInformation = {
        available_platforms: res.data.availablePages.map((page) => {
          return {
            platform_name: page.platformName,
            page_id: page.pageID
          }
        })
      }
      return shopInformation
    } catch (error) {
      throw new Error("Error fetching shop information");
    }
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
      // alert("websocket disconnected with duration: " + `${(Date.now() - this._startTimestamp) / 1000} seconds`)
      console.log('websocket disconnected');
      // reconnect
      this.connect(onmessageCallback);
    }
    this.websocketClient.onmessage = onmessageCallback;
  }
  async getPlatformInformation(platform: string, pageID: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}`;
    try {
      const response = await axios.get(url);
      const information: PlatformInformation = response.data;
      return information;
    } catch (error) {
      throw new Error("Error fetching platform information");
    }
  }
  async getShopConfig() {
    const url = `${this.botioRestApiUrl}/shops/${this.shopID}/config`
    console.log(url)
    const res = await axios.get<{ shopConfig: ShopConfig }>(url)
    return res.data.shopConfig
  }
  async saveTemplate(payload: string) {
    const url = `${this.botioRestApiUrl}/shops/${this.shopID}/config/templates`
    const body = {
      templatePayload: payload
    }
    const res = await axios.post<{ templateID: string }>(url, body)
    return res.data.templateID
  }
  async listTemplates() {
    const url = `${this.botioRestApiUrl}/shops/${this.shopID}/config/templates`
    const res = await axios.get<{ templates: ShopTemplate[] }>(url)
    return res.data.templates
  }
  async deleteTemplate(templateID: string) {
    const url = `${this.botioRestApiUrl}/shops/${this.shopID}/config/templates/${templateID}`
    const res = await axios.delete(url)
  }
  async getAllPlatformInformation() {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/all`;
    try {
      const response = await axios.get(url);
      const informations: AllPlatformInformation = response.data;
      return informations;
    } catch (error) {
      throw new Error("Error fetching all platform information");
    }
  }
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
  async getConversation(platform: string, pageID: string, conversationID: string) {
    let conversation: Conversation | null = null;
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}`;
    for (let i = 0; i < 3; i++) {
      try {
        const response = await axios.get<{ conversation: Conversation }>(url);
        conversation = response.data.conversation;
      } catch (error) {
        console.log(`failed get conversation ${conversationID} from ${platform} ${pageID} ${i} times`)
        if (i === 2) {
          throw new Error("Error fetching conversation");
        }
      }
    }
    return conversation;
  }

  async listMessage(platform: string, pageID: string, conversationID: string, skip: number = 0, limit = 20) {
    let messages: Message[];
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}/messages`;

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

  async sendTextMessage(platform: string, conversationID: string, pageID: string, psid: string, text: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}/messages?psid=${psid}`;
    const body: { message: string } = { message: text }
    try {
      const response = await axios.post(url, body);
      const message: Message = {
        shopID: this.shopID,
        pageID: pageID,
        platform: platform,
        conversationID: conversationID,
        messageID: response.data.messageID,
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

  async sendImageMessage(platform: string, conversationID: string, pageID: string, psid: string, imageFile: File) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}/messages?psid=${psid}`;
    const imageUrl = await this.uploadImage(imageFile, true);
    const body: { attachment: { type: string, payload: { src: string } } } = {
      attachment: {
        type: "image",
        payload: {
          src: imageUrl
        }
      }
    }
    try {
      const response = await axios.post<SendMessageResponse>(url, body);
      const { data } = response
      const message: Message = {
        shopID: this.shopID,
        pageID: pageID,
        platform: platform,
        conversationID: conversationID,
        messageID: data.messageID,
        timestamp: data.timestamp ?? Date.now(),
        message: "",
        source: {
          userID: psid,
          userType: "admin",
        },
        isDeleted: false,
        attachments: [
          {
            attachmentType: "image",
            payload: {
              src: imageUrl,
            }
          }
        ],
      }
      return message
    } catch (error) {
      console.log(error);
      throw new Error("Error sending message");
    }
  }

  async sendAttachmentMessage(platform: string, conversationID: string, pageID: string, psid: string, attachment: AttachmentForSending) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}/messages?psid=${psid}`;
    const body = {
      attachment: attachment
    }
    // console.log(JSON.stringify(body, null, 2))
    try {
      await axios.post(url, body);
    } catch (error) {
      console.log(error);
      throw new Error("Error sending message");
    }
  }

  async searchConversationByName(platform: string, pageID: string, name: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}` + (platform != 'all' ? `/${pageID}/conversations/` : `/conversations`);
    const res = await axios.get<{ conversations: Conversation[] }>(url, { params: { filter: JSON.stringify({ withParticipantsUsername: name }) } })
    return res.data.conversations
  }
  async searchConversationByMessage(platform: string, pageID: string, message: string) {
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}` + (platform != 'all' ? `/${pageID}/conversations/` : `/conversations`);
    const res = await axios.get<{ conversations: Conversation[] }>(url, { params: { filter: JSON.stringify({ withMessage: message }) } })
    return res.data.conversations
  }

  async uploadImage(imageFile: File, temporary: boolean = false) {
    const url: string = `${this.botioRestApiUrl}/upload_url`
    const res = await axios.get<{ presignedURL: string }>(url, { params: { temporary: temporary } })
    const presignedURL = res.data.presignedURL
    const uploadRes = await axios.put(presignedURL, imageFile, { headers: { 'Content-Type': imageFile.type } })
    const imageUrl = presignedURL.split("?")[0]
    return imageUrl
  }

  async searchMessageByText(conversation: Conversation, text: string) {
    const { conversationID, pageID, platform } = conversation
    const url: string = `${this.botioRestApiUrl}/shops/${this.shopID}/${platform}/${pageID}/conversations/${conversationID}/messages`
    const res = await axios.get<{ messages: Message[] }>(url, { params: { filter: JSON.stringify({ withMessage: text }) } })
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

export default BotioLivechat
