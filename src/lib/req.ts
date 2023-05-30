import type { Conversation, RESTFacebookConversation, RESTLineConversation } from "@/types/conversation";
import axios from "axios";

export const getFacebookConversation = async (getConversationsEndpoint: string): Promise<Conversation[]> => {
  const { data } = await axios.get<{ conversations: RESTFacebookConversation[] }>(getConversationsEndpoint);
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
export const getLineConversation = async (getConversationsEndpoint: string): Promise<Conversation[]> => {
  const { data } = await axios.get<{ conversations: RESTLineConversation[] }>(getConversationsEndpoint);
  const conversations = new Array<Conversation>(data.conversations.length);
  data.conversations.forEach((conversation, index) => {
    conversations[index] = {
      conversationID: conversation.ConversationID,
      conversationPicture: conversation.ConversationPic.src,
      updatedAt: conversation.UpdateTime,
      lastActivity: conversation.LastActivity,
      messages: { "isAlreadyFetch": false, "messages": [], "someoneTyping": false },
      isRead: true,
      participants: conversation.Participants.map((participant) => {
        return {
          userID: participant.UserID,
          username: participant.Username,
          profilePicture: participant.ProfilePic.src
        }
      })
    }
  })
  return conversations;
}
