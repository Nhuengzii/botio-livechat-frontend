import type { Conversation } from "./conversation"
import type { AttachmentForSending, Message } from "./message"
import type { PageInformation, AllPageInformation } from "./pageInformation"
import type { ShopInformation } from "./ShopInformation"

interface IBotioLivechat {
  botioRestApiUrl: string
  botioWebsocketApiUrl: string
  websocketClient: WebSocket | null
  shopID: string
  listConversation: (platform: string, pageID: string, skip: number, limit: number) => Promise<Conversation[]>
  getConversation: (platform: string, pageID: string, conversationId: string) => Promise<Conversation | null>
  listMessage: (platform: string, pageID: string, conversationId: string, skip: number, limit: number) => Promise<Message[]>
  getMessage: (platform: string, pageID: string, conversationId: string) => Promise<Message | null>
  sendTextMessage: (platform: string, conversationId: string, pageID: string, psid: string, text: string) => Promise<Message>
  sendImageMessage: (platform: string, conversationID: string, pageID: string, psid: string, imageFile: File) => Promise<Message>
  sendAttachmentMessage: (platform: string, conversationID: string, pageID: string, psid: string, attachment: AttachmentForSending) => Promise<void>
  broadcastMessage: (platform: string, pageID: string, message: Message) => void
  getPageInformation: (platform: string, pageID: string) => Promise<PageInformation>
  getAllPageInformation: () => Promise<AllPageInformation>
  searchConversationByName: (platform: string, pageID: string, name: string) => Promise<Conversation[]>
  searchConversationByMessage: (platform: string, pageID: string, message: string) => Promise<Conversation[]>
  searchMessageByText(conversation: Conversation, text: string): Promise<Message[]>
  connect: (onmessageCallback: (event: MessageEvent<any>) => void) => void
  markAsRead: (platform: string, pageID: string, conversationID: string) => Promise<void>
  getShopInformation: (shopID: string) => Promise<ShopInformation>
  uploadImage: (imageFile: File) => Promise<string>
}

export default IBotioLivechat;
