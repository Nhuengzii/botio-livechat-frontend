import { ref, computed } from "vue";
import { defineStore } from "pinia";

type Participant = {
  userId: string,
  username: string,
  profilePicture: string,
}

type Conversation = {
  shopId: string,
  pageId: string,
  conversationId: string,
  conversationPicture: string,
  updatedAt: number,
  lastActivity: string,
  participants: Participant[],
}

export const useConversationStore = defineStore("conversation", () => {
  const mockConversations: Conversation[] = [
    {
      shopId: "1",
      pageId: "1",
      conversationId: "1",
      conversationPicture: "",
      updatedAt: 234789,
      lastActivity: "Boom send nude picutes",
      participants: [
        {
          userId: "1",
          username: "Boom",
          profilePicture: "https://avatars.githubusercontent.com/u/124413969?v=4"
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "2",
      conversationPicture: "",
      updatedAt: 2347892,
      lastActivity: "Hello สวัสดี",
      participants: [
        {
          userId: "2",
          username: "Nhuengzii",
          profilePicture: "https://avatars.githubusercontent.com/u/86766644?v=4",
        }
      ]
    }
  ]
  function getConversationById(conversationId: string) {
    return computed(() => mockConversations.find((conversation) => conversation.conversationId === conversationId));
  }
  const conversations = ref<Conversation[]>(mockConversations);
  return { conversations, getConversationById }
});

