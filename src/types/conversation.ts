export type Participant = {
  userID: string,
  username: string,
  profilePicture: string,
}

export type Source = {
  sourceID: string,
  sourceName?: string
  sourcePicture?: string,
  sourceType: "USER" | "ADMIN",
}

export type Message = {
  conversationID: string,
  messageID: string,
  timeStamp: number,
  source: Source,
  message: string,
  attachments: Attachment[],
}
export type Conversation = {
  conversationID: string,
  conversationPicture: string,
  platform: string,
  updatedAt: number,
  lastActivity: string,
  participants: Participant[],
  isRead: boolean,
  messages: { "isAlreadyFetch": boolean, "messages": Message[], "someoneTyping": boolean },
}

export type Attachment = {
  type: "image" | "video" | "file" | "sticker",
  payload: {
    src: string,
  }
}

export type RESTLineConversation = {
  ShopID: string,
  PageID: string,
  ConversationID: string,
  ConversationPic: {
    src: string,
  }
  UpdatedTime: number,
  Participants: {
    UserID: string,
    Username: string,
    ProfilePic: {
      src: string,
    }
  }[],
  LastActivity: string,
  IsRead: boolean,
}

export type RESTFacebookConversation = {
  conversationID: string,
  conversationPic: {
    src: string,
  }
  updatedTime: number,
  participants: {
    userID: string,
    profilePic: {
      src: string,
    },
    username: string,
  }[],
  lastActivity: string,
  isRead: boolean,
}

export type RESTFacebookMessage = {
  messageID: string,
  timestamp: number,
  source: {
    userID: string,
    type: "user" | "admin",
  }
  message: string,
  attachments: Attachment[],
  replyTo: {
    messageID: string,
  },
  readStatus: boolean,
  deliveryStatys: boolean,
  unsendStatus: boolean,
}
export type RESTLineMessage = {
  shopID: string,
  platform: string,
  pageID: string,
  conversationID: string,
  messageID: string,
  timestamp: number,
  source: {
    userID: string,
    userType: "user" | "admin",
  }
  message: string,
  attachments: Attachment[],
  replyTo?: {
    messageID: string,
  },
}

export type StandardMessage = {
  shopID: string,
  platform: string,
  conversationID: string,
  messageID: string,
  timestamp: number,
  source: {
    userID: string,
    type: "user" | "admin",
  },
  message: string,
  attachments: Attachment[],
  replyTo: {
    messageID: string,
  }
}
