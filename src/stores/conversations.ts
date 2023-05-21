import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'
import type { Conversation, Message, RESTConversation, RESTMessage } from "@/types/conversation";
import { useRoute } from "vue-router";



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
    getConversationById(conversationId: string): Conversation {
      const router = useRoute();
      const currentPlatform = router.params.platform as string
      const conversation: Conversation = this.conversationsRaw[currentPlatform][conversationId];
      return conversation;
    },
    async fetchConversations() {
      this.isLoading = true;
      const router = useRoute();
      const currentPlatform = router.params.platform as string
      console.log("fetching conversations of " + currentPlatform + " ...");
      if (currentPlatform !== 'facebook') {
        this.isLoading = false;
        return;
      }
      const { data } = await axios.get<{ conversations: RESTConversation[] }>("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations");
      data.conversations.forEach(conversation => {
        const equivalentConversation = this.conversationsRaw[currentPlatform][conversation.conversationID];
        if (equivalentConversation) {
          if (equivalentConversation.updatedAt === conversation.updatedTime) {
            return;
          }
        }
        console.log("new conversation for " + conversation.conversationID + " of " + currentPlatform + " ...");
        this.conversationsRaw[currentPlatform][conversation.conversationID] = {
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
        }
      });
      this.isLoading = false;
    },
    async fetchMessages(conversationID: string) {
      const router = useRoute();
      const currentPlatform = router.params.platform as string
      const conversation = this.conversationsRaw[currentPlatform][conversationID];
      if (!conversation) {
        return;
      };
      if (conversation.messages.isAlreadyFetch) return conversation;
      console.log("fetching messages of " + conversationID + "of " + currentPlatform + " ...");

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
      return conversation;
    },
    addMessageFromWebsocket(conversationID: string, message: Message, platform: string | undefined = undefined) {
      console.log(`platform: ${platform}`);
      let currentPlatform: string;
      if (!platform) {
        const router = useRoute();
        currentPlatform = router.params.platform as string
      }
      else {
        currentPlatform = platform;
      }
      const conversation = this.conversationsRaw[currentPlatform][conversationID];
      if (!conversation) {
        return;
      };
      if (!conversation) return;
      conversation.messages.messages.push(message);
    }
  },
}
);

