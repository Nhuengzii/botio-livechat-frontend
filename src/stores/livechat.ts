import { defineStore } from "pinia";
import { BotioLivechat } from "@/lib/BotioLivechat";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import { conversationsMap2SortedArray } from "@/lib/ConversationsMap";
import { useEventBus } from "@vueuse/core";
import { computed, ref } from "vue";

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
]);


export const useLivechatStore = defineStore("livechat", () => {

  // State
  const botioLivechat = ref(new BotioLivechat(`https://${rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`,
    `wss://${websocket_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev`,
    "1"));
  const conversationRaw = ref(new Map<string, ConversationsMap>([
    ["facebook", new Map<string, Conversation>()],
    ["line", new Map<string, Conversation>()],
  ]));

  const currentChat = ref(null as Chat | null);
  const openChatEventBus = ref(useEventBus<Conversation>('openChatEventBus'));
  const markAsReadEventBus = ref(useEventBus<Conversation>('markAsReadEventBus'));


  // Getter
  const conversations = computed(() => (platform: string, searchMode: boolean = false): Conversation[] => {
    const conversationsMap = conversationRaw.value.get(platform);
    console.log('update conversation rerender');
    if (!conversationsMap) {
      throw new Error("conversationsMap is undefined");
    }
    return conversationsMap2SortedArray(conversationsMap);
  })

  // Action
  async function fetchConversations(platform: string): Promise<void> {
    const conversationsMap = conversationRaw.value.get(platform);
    if (!conversationsMap) {
      throw new Error("conversationsMap is undefined");
    }
    const conversations = await botioLivechat.value.listConversation(platform, pageIDMap.get(platform) as string);

    conversations.forEach((conversation) => {
      conversationsMap.set(conversation.conversationID, conversation);
    })
  }

  async function receiveMessage(message: Message) {
    const conversationsMap = conversationRaw.value.get(message.platform);
    if (!conversationsMap) {
      throw new Error("conversationsMap is undefined");
    }
    let conversation = conversationsMap.get(message.conversationID);
    if (!conversation) {
      conversation = await botioLivechat.value.getConversation(message.platform, message.pageID, message.conversationID);
    }
    conversation.lastActivity = messageToActivity(message);
    conversation.updatedTime = message.timestamp
    conversation.isRead = false;
    if (currentChat.value && currentChat.value.conversation.conversationID === conversation.conversationID) {
      currentChat.value.messages.push(message);
      conversation.isRead = true;
      markAsReadEventBus.value.emit(conversation);
    }
  }

  async function fetchMessages(platform: string, conversation: Conversation) {
    const messages = await botioLivechat.value.listMessage(platform, pageIDMap.get(platform) as string, conversation.conversationID);
    if (!currentChat.value) {
      throw new Error("currentChat is undefined");
    }
    currentChat.value.messages.push(...messages);
  }

  async function sendTextMessage(conversation: Conversation, message: string) {
    const newMessage = await botioLivechat.value.sendTextMessage(conversation.platform, conversation.conversationID, conversation.pageID, conversation.participants[0].userID, message)
  }

  function openChat(platform: string, conversationID: string) {
    const conversationsMap = conversationRaw.value.get(platform);
    if (!conversationsMap) {
      throw new Error("conversationsMap is undefined");
    }
    const conversation = conversationsMap.get(conversationID);
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
    markAsReadEventBus.value.emit(conversation);
  }
  function closeChat(conversationID: string) {
    if (currentChat.value?.conversation.conversationID === conversationID) {
      currentChat.value = null;
    }
  }

  return { botioLivechat, conversationRaw, currentChat, conversations, fetchConversations, fetchMessages, openChat, openChatEventBus, markAsReadEventBus, receiveMessage, sendTextMessage, closeChat }
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
