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

type AttachmentForSending = {
  type: string,
  payload: FacebookTemplateGeneric | LineTemplateCarosel | LineTemplateButtons | LineTemplateConfirm | LineTemplateImageCarousel | InstagramTemplateGeneric
}

type FacebookTemplateGeneric = {
  facebookTemplateGeneric: {
    title: string,
    message: string,
    picture: string,
    buttons: {
      url: string,
      title: string,
    }[]
    default_action?: {
      url: string
    }
  }[]
}

type LineTemplateButtons = {
  lineTemplateButtons: {
    altText: string,
    thumbnailImageUrl?: string,
    title?: string,
    text: string,
    defaultAction: {
      label: string,
      uri: string
    },
    actions: {
      label: string,
      uri: string,
    }[]
  }
}

type LineTemplateConfirm = {
  lineTemplateConfirm: {
    altText: string,
    text: string,
    actions: {
      label: string,
      uri: string
    }[]
  }
}

type LineTemplateImageCarousel = {
  lineTemplateImageCarousel: {
    altText: string,
    columns: {
      imageUrl: string,
      action: {
        label: string,
        uri: string
      }
    }[]
  }
}

type LineTemplateCarosel = {
  lineTemplateCarosel: {
    altText: string,
    columns: {
      thumbnailImageUrl: string,
      title: string,
      text: string,
      defaultAction: {
        label: string,
        uri: string
      },
      actions: {
        label: string,
        uri: string
      }[]
    }[]
  }
}

type InstagramTemplateGeneric = {
  instagramTemplateGeneric: {
    title: string,
    message: string,
    picture: string,
    buttons: {
      url: string,
      title: string,
    }[]
    default_action?: {
      url: string
    }
  }[]
}


export type { Message, Attachment, Source, Payload, FacebookTemplateGeneric, LineTemplateButtons, LineTemplateConfirm, LineTemplateCarosel, LineTemplateImageCarousel, InstagramTemplateGeneric, AttachmentForSending }
