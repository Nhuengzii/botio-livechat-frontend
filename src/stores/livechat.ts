import { defineStore } from "pinia";
import { BotioLivechat } from "@/lib/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import type { PageInformation } from "@/types/pageInformation";
import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import { useEventBus } from "@vueuse/core";
import { computed, ref } from "vue";
import { useUIStore } from "./UI";

type ConversationsMap = Map<string, Conversation>;
type Chat = { conversation: Conversation, messages: Message[], isFetching: boolean };

const rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID;
if (rest_api_id === undefined) {
  throw new Error("VITE_REST_API_ID is undefined");
}
const websocket_api_id = import.meta.env.VITE_BOTIO_WEBSOCKET_API_ID;
if (websocket_api_id === undefined) {
  throw new Error("VITE_WEBSOCKET_API_ID is undefined");
}

const pageIDMap = new Map<string, string>([
  ["facebook", "108362942229009"],
  ["line", "U6972d1d58590afb114378eeab0b08d52"],
  ["instagram", "17841460321068782"]
]);


export const useLivechatStore = defineStore("livechat", () => {

  function _onmessageCallbacks(event: MessageEvent<any>) {
    const data: { action: string, message: any } = JSON.parse(event.data)
    console.log(data)
    switch (data.action) {
      case "broadcast":
      case "relay":
        const message: Message = data.message
        receiveMessage(message)
        break;
      default:
        alert("unknown action")
    }
  }
  // State
  const botioLivechat = ref(new BotioLivechat(`https://${rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`,
    `wss://${websocket_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`,
    "1", _onmessageCallbacks));
  const conversationRaw = ref<ConversationsMap>(new Map<string, Conversation>());

  const currentChat = ref(null as Chat | null);
  const openChatEventBus = ref(useEventBus<Conversation>('openChatEventBus'));
  const markAsReadEventBus = ref(useEventBus<string>('markAsReadEventBus'));


  // Getter
  const conversations = computed(() => (platform: string, searchMode: boolean = false): Conversation[] => {
    return conversationsMap2SortedArray(conversationRaw.value, platform);
  })

  // Action
  async function fetchConversations(platform: string): Promise<void> {
    const conversations = await botioLivechat.value.listConversation(platform, pageIDMap.get(platform) as string);
    conversations.forEach((conversation) => {
      conversationRaw.value.set(conversation.conversationID, conversation);
    })
  }

  async function getPageInformation(platform: string): Promise<PageInformation> {
    const pageID = pageIDMap.get(platform);
    if (!pageID) {
      throw new Error("pageID is undefined");
    }
    const platformInformation = await botioLivechat.value.getPageInformation(platform, pageID);
    return platformInformation;
  }

  async function receiveMessage(message: Message) {
    const uiStore = useUIStore()
    let conversation: Conversation | undefined | null = conversationRaw.value.get(message.conversationID);
    if (!conversation) {
      conversation = await botioLivechat.value.getConversation(message.platform, message.pageID, message.conversationID);
      if (!conversation) {
        throw new Error("cannot find this conversation");
      }
      conversationRaw.value.set(conversation.conversationID, conversation);
    }
    botioLivechat.value.getPageInformation(message.platform, message.pageID).then((pageInformation) => {
      uiStore.availablesPlatforms.set(message.platform, pageInformation);
      console.log(`update ${message.platform} page information`);
    })
    conversation.lastActivity = messageToActivity(message);
    conversation.updatedTime = message.timestamp
    conversation.unread++;
    if (currentChat.value && currentChat.value.conversation.conversationID === conversation.conversationID) {
      const lastIndex = currentChat.value.messages.length - 1;
      if (currentChat.value.messages[lastIndex].messageID.startsWith('temp-')) {
        currentChat.value.messages.pop();
      }
      currentChat.value.messages.push(message);
      conversation.unread = 0;
      markAsReadEventBus.value.emit(conversation.conversationID);
    }
  }

  async function markAsRead(platform: string, conversationID: string) {
    await botioLivechat.value.markAsRead(platform, pageIDMap.get(platform) as string, conversationID);
  }

  async function fetchMessages(platform: string, conversation: Conversation) {
    const messages = await botioLivechat.value.listMessage(platform, pageIDMap.get(platform) as string, conversation.conversationID);
    const uiStore = useUIStore()
    botioLivechat.value.getPageInformation(platform, conversation.pageID).then((pageInformation) => {
      uiStore.availablesPlatforms.set(platform, pageInformation);
    })
    if (!currentChat.value) {
      throw new Error("currentChat is undefined");
    }
    currentChat.value.messages.push(...messages);
  }

  async function sendTextMessage(conversation: Conversation, message: string) {
    if (currentChat.value?.conversation.conversationID == conversation.conversationID) {
      const tempMessage: Message = {
        shopID: conversation.shopID,
        platform: conversation.platform,
        pageID: conversation.pageID,
        conversationID: conversation.conversationID,
        messageID: `temp-${Date.now()}`,
        timestamp: Date.now(),
        source: {
          userType: "admin",
          userID: "ADMIN",
        },
        message: message,
        isDeleted: false,
        attachments: []
      }
      currentChat.value.messages.push(tempMessage)
    }
    const newMessage = await botioLivechat.value.sendTextMessage(conversation.platform, conversation.conversationID, conversation.pageID, conversation.participants[0].userID, message)
    receiveMessage(newMessage);
  }

  function openChat(platform: string, conversationID: string) {
    const conversation = conversationRaw.value.get(conversationID);
    if (!conversation) {
      throw new Error("conversation is undefined");
    }
    if (!currentChat.value) {
      currentChat.value = { conversation: conversation, messages: [], isFetching: false };
    } else {
      if (currentChat.value.conversation.conversationID === conversationID) {
        return;
      }
      currentChat.value.conversation = conversation;
      currentChat.value.messages = [];
    }
    openChatEventBus.value.emit(conversation);
  }
  function closeChat(conversationID: string) {
    if (currentChat.value?.conversation.conversationID === conversationID) {
      currentChat.value = null;
    }
  }
  async function searchConversationByName(platform: string, name: string) {
    const covnersation = await botioLivechat.value.searchConversationByName(platform, pageIDMap.get(platform) as string, name);
    return covnersation;
  }
  async function searchConversationByMessage(platform: string, message: string) {
    const covnersation = await botioLivechat.value.searchConversationByMessage(platform, pageIDMap.get(platform) as string, message);
    return covnersation;
  }

  return { botioLivechat, conversationRaw, currentChat, conversations, fetchConversations, fetchMessages, openChat, openChatEventBus, markAsReadEventBus, receiveMessage, sendTextMessage, closeChat, getPageInformation, searchConversationByName, searchConversationByMessage, markAsRead }
})

function messageToActivity(message: Message): string {
  if (message.message.length > 0) {
    if (message.source.userType === "user") {
      return message.message;
    } else if (message.source.userType === "admin") {
      return "คุณ: " + message.message;
    } else {
      return `WTF ${message.source.userType} พิมพ์ข้อความ`
    }
  } else if (message.attachments.length > 0) {
    if (message.attachments[0].attachmentType === "image") {
      if (message.source.userType === "user") {
        return "ส่งรูปภาพ";
      } else if (message.source.userType === "admin") {
        return "คุณส่งรูปภาพ";
      } else {
        return `WTF ${message.source.userType} ส่งรูปภาพ`
      }
    }
  } else {
    return "WTF";
  }
  return "wwwwwwwwwwwwwwwwwwwwwwwww"
}
