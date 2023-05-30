import { defineStore } from "pinia";
import { useConversationsStore } from "./conversations";
import type { Conversation, Message } from "@/types/conversation";

export const useLoadTestStore = defineStore("loadtest", {
  state: () => (
    {
    }
  ),
  actions: {
    mockReceiveConversation(count: number, interval: number, duration: number) {
      console.log("mockReceiveConversation activate");

      const conversationStore = useConversationsStore();
      const timer = setInterval(() => {
        console.log("Firing");
        for (let i = 0; i < count; i++) {
          const newConversationID: string = "Mock_" + Math.floor(Math.random() * 10000000000).toString();
          const newConversation: Conversation = {
            conversationID: newConversationID,
            updatedAt: new Date().getTime(),
            messages: {
              isAlreadyFetch: true,
              messages: [],
              someoneTyping: false,
            },
            lastActivity: "สวัสดีค่ะ",
            isRead: true,
            conversationPicture: '',
            participants: [
              {
                userID: "USER_" + newConversationID,
                username: newConversationID,
                profilePicture: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 90000000)}?v=4`,
              }
            ]
          }
          conversationStore.conversationsRaw['facebook'].raw[newConversationID] = newConversation;
        }
      }, interval)

      setTimeout(() => {
        clearInterval(timer);
      }, duration)
    }

  },
}
)

