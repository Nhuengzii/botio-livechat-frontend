type ShopInformation = {
  available_pages: {
    platform_name: string,
    page_id: string
  }[]
}

type ShopConfig = {
  shop_id: string,
  templates: {
    id: string,
    payload: string
  }[]
}

export type { ShopInformation, ShopConfig };
