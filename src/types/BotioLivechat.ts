import type { Conversation } from "./conversation"
import type { Message } from "./message"

interface IBotioLivechat {
  botioRestApiUrl: string
  botioWebsocketApiUrl: string
  fetchConversations: (platform: string, pageID: string) => Promise<Conversation[]>
  fetchConversation: (platform: string, pageID: string, conversationId: string) => Promise<Conversation | null>
  fetchMessages: (platform: string, pageID: string, conversationId: string) => Promise<Message[]>
  getConversations: (platform: string) => Conversation[]
  getConversation: (platform: string, pageID: string, conversationId: string) => Conversation | null
  getMessages: (platform: string, pageID: string, conversationId: string) => Promise<Message[]>
  getMessage: (platform: string, conversationId: string, messageId: string) => Promise<Message | null>
  sendTextMessage: (platform: string, conversationId: string, pageID: string, psid: string, text: string) => Promise<Message | null>
}

export default IBotioLivechat;
