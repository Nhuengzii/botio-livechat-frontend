type ShopInformation = {
  available_pages: {
    platform_name: string,
    page_id: string
  }[]
}

type ShopTemplate = {
  id: string,
  payload: string
}

type ShopConfig = {
  shopID: string,
  Templates: ShopTemplate[]
}

export type { ShopInformation, ShopConfig, ShopTemplate };
