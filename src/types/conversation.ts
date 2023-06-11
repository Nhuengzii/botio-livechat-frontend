type Conversation = {
  shopID: string,
  pageID: string,
  conversationID: string,
  updatedTime: number,
  participants: Participant[],
  conversationPic: string,
  lastActivity: string,
  isRead: boolean,
}

type Participant = {
  userID: string,
  username: string,
  profilePic: string,
}

export type { Conversation }
