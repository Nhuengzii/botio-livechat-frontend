type Conversation = {
  shopID: string,
  pageID: string,
  conversationID: string,
  platform: string,
  updatedTime: number,
  participants: Participant[],
  conversationPic: {
    src: string
  },
  lastActivity: string,
  unread: number,
}

type Participant = {
  userID: string,
  username: string,
  profilePic: {
    src: string
  },
}

export type { Conversation }
