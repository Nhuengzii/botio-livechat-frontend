type ShopInformation = {
  available_platforms: Platform[]
}

type Platform = {
  platform_name: string,
  page_id: string
}

type PlatformInformation = {
  unread_conversations: number,
  all_conversations: number,
}

type ShopTemplate = {
  id: string,
  payload: string
}

type ShopConfig = {
  shop_id: string,
}

type AllPlatformInformation = {
  statuses: {
    platform: string,
    unreadConversations: number,
    allConversations: number
  }[]
}

export type { ShopInformation, ShopConfig, ShopTemplate, PlatformInformation, Platform, AllPlatformInformation };
