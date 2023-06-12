type Message = {
  shopID: string,
  platform: string,
  pageID: string,
  conversationID: string,
  messageID: string,
  timestamp: string,
  source: Source,
  message: string,
  attachments?: Attachment[],
  replyTo?: RepliedMessage,
}

type Attachment = {
  attachmentType: string,
  payload: Payload
}

type Payload = {
  src: string
}

type Source = {
  userID: string,
  userType: string
}

type RepliedMessage = {
  messageID: string
}

export type { Message, Attachment, Source, Payload }