import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'
import type { Conversation, Message, RESTConversation, RESTMessage } from "@/types/conversation";
import { useRoute } from "vue-router";
import { useWebsocketStore } from "./websocket";



export const useConversationsStore = defineStore("conversations", {
  state: () => ({
    conversationsRaw: {
      "facebook": {},
      "line": {},
      "ig": {}
    } as Record<string, Record<string, Conversation>>,
    isLoading: false,
  }),
  getters: {
    conversations: (state): Conversation[] => {
      // return sorted conversations by updatedAt
      const router = useRoute();
      const sortedConversations = Object.values(state.conversationsRaw[router.params.platform as string]).sort((a, b) => {
        return b.updatedAt - a.updatedAt;
      })
      console.log("Sorted success");

      return sortedConversations;
    }
  },
  actions: {
    getConversationById(conversationId: string, platform: string): Conversation {
      const conversation: Conversation = this.conversationsRaw[platform][conversationId];
      return conversation;
    },
    async fetchConversations(platform: string) {
      this.isLoading = true;
      console.log("fetching conversations of " + platform + " ...");
      if (platform !== 'facebook') {
        this.isLoading = false;
        return;
      }
      const botio_rest_api_id = import.meta.env.VITE_BOTIO_REST_API_ID as string; if (botio_rest_api_id === undefined) {
        console.error("VITE_BOTIO_REST_API_ID is not defined");
        this.isLoading = false;
        return;
      }
      const getConversationsEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations`;
      if (getConversationsEndpoint === undefined) {
        console.error("VITE_GET_CONVERSATIONS_ENDPOINT is not defined");
        this.isLoading = false;
        return;
      }
      const { data } = await axios.get<{ conversations: RESTConversation[] }>(getConversationsEndpoint);
      data.conversations.forEach(conversation => {
        const equivalentConversation = this.conversationsRaw[platform][conversation.conversationID];
        if (equivalentConversation) {
          if (equivalentConversation.updatedAt === conversation.updatedTime) {
            return;
          }
        }
        console.log("new conversation for " + conversation.conversationID + " of " + platform + " ...");
        this.conversationsRaw[platform][conversation.conversationID] = {
          conversationID: conversation.conversationID,
          conversationPicture: conversation.conversationPic.src,
          updatedAt: conversation.updatedTime,
          lastActivity: conversation.lastActivity,
          participants: conversation.participants.map((participant) => {
            return {
              userID: participant.userID,
              username: participant.username,
              profilePicture: participant.profilePic.src,
            }
          }),
          messages: { "isAlreadyFetch": false, "messages": [] },
          isRead: conversation.isRead,
        }
      });
      this.isLoading = false;
    },
    async fetchMessages(conversationID: string, platform: string) {
      const conversation = this.conversationsRaw[platform][conversationID];
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
      const getMessagesEndpoint = `https://${botio_rest_api_id}.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations/`;
      const { data } = await axios.get<{ messages: RESTMessage[] }>(getMessagesEndpoint + conversationID + "/messages");
      data.messages.forEach(element => {
        const message: Message = {
          conversationID: conversationID,
          messageID: element.messageID,
          timeStamp: element.timestamp,
          source: {
            sourceID: element.source.userID,
            sourceType: element.source.type.toUpperCase() as "USER" | "ADMIN",
            sourcePicture: conversation.participants.find(participant => participant.userID === element.source.userID)?.profilePicture,
          },
          message: element.message,
          attachments: element.attachments
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
      const conversation = this.conversationsRaw[platform][conversationID];
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
      let conversation = this.conversationsRaw[platform][conversationID];
      if (!conversation) {
        await this.fetchConversations(platform);
        conversation = this.conversationsRaw[platform][conversationID];
        if (!conversation) {
          console.error("conversation not found");
          return;
        }
      };
      if (!conversation.messages.isAlreadyFetch) {
        conversation.messages.messages.push(message);
      }
      conversation.updatedAt = message.timeStamp;
      conversation.lastActivity = message.message;
    }
  },
}
);

