import type { Conversation } from "./conversation"
import type { Message } from "./message"

interface IBotioLivechat {
  botioRestApiUrl: string
  botioWebsocketApiUrl: string
  fetchConversations: (platform: string) => Promise<Conversation[]>
  fetchMessages: (platform: string, conversationId: string) => Promise<Message[]>
  getConversations: (platform: string) => Promise<Conversation[]>
  getConversation: (platform: string, conversationId: string) => Promise<Conversation | null>
  getMessages: (platform: string, conversationId: string) => Promise<Message[]>
  getMessage: (platform: string, conversationId: string, messageId: string) => Promise<Message | null>
  sendTextMessage: (platform: string, conversationId: string, text: string) => Promise<Message | null>
}

export default IBotioLivechat;
