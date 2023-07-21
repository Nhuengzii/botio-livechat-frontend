type ShopInformationResponse = {
  availablePages: {
    platformName: string,
    pageID: string
  }[]
}

type SendMessageResponse = {
  messageID: string,
  recipientID: string,
  timestamp: number,
}

export type { ShopInformationResponse, SendMessageResponse }
