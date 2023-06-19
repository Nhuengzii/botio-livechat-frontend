import type { Conversation } from "./conversation"
import type { Message } from "./message"

interface IBotioLivechat {
  botioRestApiUrl: string
  botioWebsocketApiUrl: string
  websocketClient: WebSocket | null
  shopID: string
  listConversation: (platform: string, pageID: string) => Promise<Conversation[]>
  getConversation: (platform: string, pageID: string, conversationId: string) => Promise<Conversation | null>
  listMessage: (platform: string, pageID: string, conversationId: string) => Promise<Message[]>
  getMessage: (platform: string, pageID: string, conversationId: string) => Promise<Message | null>
  sendTextMessage: (platform: string, conversationId: string, pageID: string, psid: string, text: string) => Promise<Message | null>
  broadcastMessage: (platform: string, pageID: string, message: Message) => void
}

export default IBotioLivechat;
