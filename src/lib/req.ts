import type { Conversation, RESTConversation } from "@/types/conversation";
import axios from "axios";

export const getFacebookConversation = async (shopID: string, pageID: string, getConversationsEndpoint: string): Promise<Conversation[]> => {
  const { data } = await axios.get<{ conversations: RESTConversation[] }>(getConversationsEndpoint);
  const conversations = new Array<Conversation>(data.conversations.length);
  data.conversations.forEach((conversation, index) => {
    conversations[index] = {
      conversationID: conversation.conversationID,
      conversationPicture: conversation.conversationPic.src,
      updatedAt: conversation.updatedTime,
      lastActivity: conversation.lastActivity,
      messages: { "isAlreadyFetch": false, "messages": [], "someoneTyping": false },
      isRead: true,
      participants: conversation.participants.map((participant) => {
        return {
          userID: participant.userID,
          username: participant.username,
          profilePicture: participant.profilePic.src
        }
      })
    }
  })
  return conversations;
}
