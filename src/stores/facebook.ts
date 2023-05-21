import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'
import type { Conversation, Message, RESTConversation, RESTMessage } from "@/types/conversation";



export const useFacebookStore = defineStore("facebook", {
  state: () => ({
    conversations: [] as Conversation[],
  }),
  actions: {
    getConversationById(conversationId: string) {
      return conversationId;
    },
    async fetchConversations() {
      const { data } = await axios.get<{ conversations: RESTConversation[] }>("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations");
      this.conversations = [];
      data.conversations.forEach(conversation => {
        this.conversations.push({
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
        })
      });
      console.log("Current conversations", this.conversations)
    },
    async fetchMessages(conversationID: string) {
      const conversation = this.conversations.find((conversation) => conversation.conversationID === conversationID);
      if (!conversation) return;
      if (conversation.messages.isAlreadyFetch) return conversation;
      const { data } = await axios.get<{ messages: RESTMessage[] }>("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations/" + conversationID + "/messages");
      data.messages.forEach(element => {
        const message: Message = {
          conversationID: conversationID,
          messageID: element.messageID,
          timeStamp: element.timestamp,
          source: {
            sourceID: element.source.userID,
            sourceType: element.source.type === "user" ? "USER" : "ADMIN",
          },
          message: element.message,
        }
        conversation.messages.messages.push(message);
        conversation.messages.isAlreadyFetch = true;
      });
      console.log("Current conversation", conversation)
      return conversation;
    },
    addMessage(conversationID: string, message: Message) {
      const conversation = this.conversations.find((conversation) => conversation.conversationID === conversationID);
      if (!conversation) return;
      conversation.messages.messages.push(message);
    }
  },
}
);

