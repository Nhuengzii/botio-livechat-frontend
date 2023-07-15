type PageInformation = {
  unreadConversations: number,
  allConversations: number
}

type AllPageInformation = {
  statuses: {
    platform: string,
    unreadConversations: number,
    allConversations: number
  }[]
}

export type { PageInformation, AllPageInformation };
