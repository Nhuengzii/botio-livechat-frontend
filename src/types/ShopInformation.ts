type ShopInformation = {
  available_pages: {
    platform_name: string,
    page_id: string
  }[]
}

type ShopConfig = {
  shopID: string,
  templates: {
    id: string,
    payload: string
  }[]
}

export type { ShopInformation, ShopConfig };
