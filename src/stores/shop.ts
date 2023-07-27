import BotioLivechat from "@/lib/BotioLivechat";
import type IBotioLivechat from "@/types/BotioLivechat/IBotioLivechat";
import type { Platform, PlatformInformation, ShopInformation } from "@/types/ShopInformation";
import { defineStore } from "pinia";

interface IShopStore {
  shop_id: string,
  shop_information: ShopInformation,
  platform_informations: Map<string, PlatformInformation>
}

export const useShopStore = defineStore("shop", {
  state: (): IShopStore => ({
    shop_id: "-1",
    shop_information: {
      available_platforms: []
    },
    platform_informations: new Map()
  }),
  getters: {
    pageID: (state) => ((platformName: string): string | undefined => {
      if (platformName === 'all') {
        return "-1"
      }
      const platform = state.shop_information.available_platforms.find((platform) => platform.platform_name === platformName);
      if (!platform) {
        console.warn(`cannot find page_id for platform: `, platformName);
        return undefined;
      }
      return platform.page_id;
    }),
    platformInformation: (state) => ((platformName: string): PlatformInformation => {
      if (platformName === 'all') {
        return {
          unread_conversations: Array.from(state.platform_informations.values()).reduce((acc, cur) => acc + cur.unread_conversations, 0),
          all_conversations: Array.from(state.platform_informations.values()).reduce((acc, cur) => acc + cur.all_conversations, 0),
        }
      }
      const platform = state.platform_informations.get(platformName);
      if (!platform) {
        console.warn(`cannot find platform information for platform: `, platformName);
        return {
          unread_conversations: 0,
          all_conversations: 0,
        };
      }
      return platform;
    }),
  },
  actions: {
    async fetchShopInformation() {
      const botioLivechat: IBotioLivechat = new BotioLivechat(this.shop_id)
      const shopInformation = await botioLivechat.getShopInformation(this.shop_id)
      this.shop_information = shopInformation;
    },
    async fetchPlatformInformation() {
      const botioLivechat: IBotioLivechat = new BotioLivechat(this.shop_id)
      const platformInformation = await botioLivechat.getAllPlatformInformation()
      for (const { platform, unreadConversations, allConversations } of platformInformation.statuses) {
        const pageID = this.shop_information.available_platforms.find((platformInfo) => platformInfo.platform_name === platform)?.page_id;
        if (!pageID) {
          console.warn(`cannot find page_id for platform: `, platform);
          continue;
        }
        this.platform_informations.set(platform, {
          unread_conversations: unreadConversations,
          all_conversations: allConversations,
        });
      }
    }
  }
})
