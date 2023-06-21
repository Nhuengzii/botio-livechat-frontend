type Message = {
  shopID: string,
  platform: string,
  pageID: string,
  conversationID: string,
  messageID: string,
  timestamp: number,
  source: Source,
  message: string,
  attachments: Attachment[],
  replyTo?: RepliedMessage,
  isDeleted: boolean,
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
