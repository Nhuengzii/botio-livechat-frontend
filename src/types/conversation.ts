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
}
export type Conversation = {
  conversationID: string,
  conversationPicture: string,
  updatedAt: number,
  lastActivity: string,
  participants: Participant[],
  messages: { "isAlreadyFetch": boolean, "messages": Message[] },
}
