type Conversation = {
[x: string]: any
  shopID: string,
  pageID: string,
  conversationID: string,
  updatedTime: number,
  participants: Participant[],
  conversationPic: {
    src: string
  },
  lastActivity: string,
  isRead: boolean,
}

type Participant = {
  userID: string,
  username: string,
  profilePic: {
    src: string
  },
}

export type { Conversation }
