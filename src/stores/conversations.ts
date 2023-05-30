import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'
import type { Conversation, Message, RESTFacebookConversation, RESTFacebookMessage } from "@/types/conversation";
import { useRoute } from "vue-router";
import { useWebsocketStore } from "./websocket";
import { getFacebookConversation, getFacebookMessages, getLineConversation, getLineMessages } from "@/lib/req";



export const useConversationsStore = defineStore("conversations", {
  state: () => ({
    conversationsRaw: {
      "facebook": { isFetching: false, raw: {} },
      "line": { isFetching: false, raw: {} },
      "instagram": { isFetching: false, raw: {} },
      "centralized": { isFetching: false, raw: {} },
    } as Record<string, { isFetching: boolean, raw: Record<string, Conversation> }>,
  }),
  getters: {
    conversations: (state) => {
      return (platform: string) => {
        const sortedConversations = Object.values(state.conversationsRaw[platform].raw).sort((a, b) => {
          return b.updatedAt - a.updatedAt;
        })
        console.log("Sorted success");
        return sortedConversations;
      };
    }, centalizedConversations(): Conversation[] {
      const facebookConversatinos = this.conversations("facebook")
      const lineConversations = this.conversations("line")
      const conversations: Conversation[] = [...facebookConversatinos, ...lineConversations];
      return conversations.sort((a, b) => {
        return b.updatedAt - a.updatedAt;
      })
    }

  },
  actions: {
    getConversationById(conversationId: string, platform: string): Conversation {
      const conversation: Conversation = this.conversationsRaw[platform].raw[conversationId];
      return conversation;
    },
    async fetchConversations(platform: string) {
      if (this.conversationsRaw[platform].isFetching) {
        return;
      }
      this.conversationsRaw[platform].isFetching = true;
      console.log("fetching conversations of " + platform + " ...");
      const botio_rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID as string; if (botio_rest_api_id === undefined) {
        console.error("VITE_BOTIO_REST_API_ID is not defined");
        this.conversationsRaw[platform].isFetching = false;
        return;
      }

      let conversations: Conversation[];
      let getCoversationsEndpoint: string;
      switch (platform) {
        case "facebook":
          getCoversationsEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/${platform}/108362942229009/conversations`;
          conversations = await getFacebookConversation(getCoversationsEndpoint);
          break
        case "line":
          console.log("Getting line conversations");
          getCoversationsEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/${platform}/U6972d1d58590afb114378eeab0b08d52/conversations`;
          conversations = await getLineConversation(getCoversationsEndpoint);
          break
        case "centralized":
          console.log("Getting centalized conversations");
          this.conversationsRaw[platform].isFetching = false;
          return;
        default:
          console.log("Platform not supported");
          this.conversationsRaw[platform].isFetching = false;
          return;
      }
      conversations.forEach(conversation => {
        const equivalentConversation = this.conversationsRaw[platform].raw[conversation.conversationID];
        if (!equivalentConversation) {
          this.conversationsRaw[platform].raw[conversation.conversationID] = conversation;
          return;
        }
        equivalentConversation.updatedAt = conversation.updatedAt;
        equivalentConversation.lastActivity = conversation.lastActivity;
      });
      this.conversationsRaw[platform].isFetching = false;
    },
    setTypingStatus(conversationID: string, platform: string, status: boolean) {
      this.conversationsRaw[platform].raw[conversationID].messages.someoneTyping = status;
      useWebsocketStore().broadcastTypingEvent(conversationID, platform, status);
    },
    async fetchMessages(conversationID: string, platform: string) {
      const conversation = this.conversationsRaw[platform].raw[conversationID];
      if (!conversation) {
        return;
      };
      if (conversation.messages.isAlreadyFetch) return conversation;
      console.log("fetching messages of " + conversationID + "of " + platform + " ...");
      const botio_rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID as string;
      if (botio_rest_api_id === undefined) {
        console.error("VITE_BOTIO_REST_API_ID is not defined");
        return;
      }
      let getMessageBaseEndpoint: string
      let receivedMessages: Message[];
      switch (platform) {
        case "facebook":
          getMessageBaseEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/${platform}/108362942229009/conversations/`;
          receivedMessages = await getFacebookMessages(getMessageBaseEndpoint, conversationID);
          break
        case "line":
          getMessageBaseEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/${platform}/U6972d1d58590afb114378eeab0b08d52/conversations/`;
          receivedMessages = await getLineMessages(getMessageBaseEndpoint, conversationID);
          break;
        default:
          console.log("Platform not supported");
          return;
      }
      receivedMessages.forEach(message => {
        if (message.source.sourceType === "USER") {
          message.source.sourcePicture = conversation.participants[0].profilePicture;
          message.source.sourceName = conversation.participants[0].username;
        }
        conversation.messages.messages.push(message);
        conversation.messages.isAlreadyFetch = true;
      });
      return conversation;
    },
    async sendTextMessage(conversationID: string, senderID: string, message: string, platform: string) {
      const botio_rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID as string;
      if (botio_rest_api_id === undefined) {
        console.error("VITE_BOTIO_REST_API_ID is not defined");
        return;
      }
      const conversation = this.conversationsRaw[platform].raw[conversationID];
      if (!conversation) {
        console.log("Cannot send Text message. Conversation not found");
        return;
      }
      const mockMessageID: string = `MOCK_${Math.floor(Math.random() * 23432432432)}`
      const newMessageIndex = conversation.messages.messages.length;
      const sendMessageEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/${platform}/108362942229009/conversations/${conversationID}/messages?psid=${senderID}`;
      const newMessage: Message = {
        conversationID: conversationID,
        messageID: mockMessageID,
        timeStamp: new Date().getTime(),
        source: {
          sourceID: senderID,
          sourceType: "ADMIN"
        },
        message: message,
        attachments: [],
      }
      conversation.messages.messages.push(newMessage);
      try {
        const { data } = await axios.post<{ message_id: string, recipient_id: string, timestamp: number }>(sendMessageEndpoint, { message: message },);
        newMessage.messageID = data.message_id;
        newMessage.timeStamp = data.timestamp;
      } catch (error) {
        console.error(error);
        conversation.messages.messages.splice(newMessageIndex, 1);
        return;
      } finally {
        conversation.messages.messages[newMessageIndex] = newMessage;
        conversation.updatedAt = newMessage.timeStamp;
        conversation.isRead = true;
        conversation.lastActivity = "คุณ: " + newMessage.message;
      }
      const websocketStore = useWebsocketStore()
      websocketStore.broadcastMessage(newMessage);
    },
    async addMessageFromWebsocket(conversationID: string, message: Message, platform: string) {
      let conversation = this.conversationsRaw[platform].raw[conversationID];
      if (!conversation) {
        await this.fetchConversations(platform);
        conversation = this.conversationsRaw[platform].raw[conversationID];
        if (!conversation) {
          console.error("conversation not found");
          return;
        }
      };
      if (conversation.messages.isAlreadyFetch) {
        conversation.messages.messages.push(message);
      }
      conversation.updatedAt = message.timeStamp;
      conversation.lastActivity = message.message;
    }
  },
}
);

