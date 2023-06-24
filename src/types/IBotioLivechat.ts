import type { Conversation } from "./conversation"
import type { Message } from "./message"
import type { PageInformation } from "./pageInformation"

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
  getPageInformation: (platform: string, pageID: string) => Promise<PageInformation>
  searchConversationByName: (platform: string, pageID: string, name: string) => Promise<Conversation[]>
  searchConversationByMessage: (platform: string, pageID: string, message: string) => Promise<Conversation[]>
  searchMessageByText(conversation: Conversation, text: string): Promise<Message[]>
  connect: (onmessageCallback: (event: MessageEvent<any>) => void) => void
  markAsRead: (platform: string, pageID: string, conversationID: string) => Promise<void>
}

export default IBotioLivechat;
