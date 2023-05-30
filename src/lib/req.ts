import type { Conversation, Message, RESTFacebookConversation, RESTFacebookMessage, RESTLineConversation, RESTLineMessage } from "@/types/conversation";
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
      updatedAt: conversation.UpdatedTime,
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

export const getFacebookMessages = async (getMessageBaseEndpoint: string, conversationID: string): Promise<Message[]> => {
  const { data } = await axios.get<{ messages: RESTFacebookMessage[] }>(getMessageBaseEndpoint + conversationID + "/messages");
  const messages = new Array<Message>(data.messages.length);
  data.messages.forEach((message, index) => {
    messages[index] = {
      conversationID: conversationID,
      messageID: message.messageID,
      timeStamp: message.timestamp,
      source: {
        sourceID: message.source.userID,
        sourceType: message.source.type.toUpperCase() as "USER" | "ADMIN",
        sourcePicture: undefined,
      },
      message: message.message,
      attachments: message.attachments
    }
  })
  return messages;
}
export const getLineMessages = async (getMessageBaseEndpoint: string, conversationID: string): Promise<Message[]> => {
  const { data } = await axios.get<{ messages: RESTLineMessage[] }>(getMessageBaseEndpoint + conversationID + "/messages");
  const messages = new Array<Message>(data.messages.length);
  data.messages.forEach((message, index) => {
    messages[index] = {
      conversationID: conversationID,
      messageID: message.messageID,
      timeStamp: message.timestamp,
      source: {
        sourceID: message.source.userID,
        sourceType: message.source.userType.toUpperCase() as "USER" | "ADMIN",
        sourcePicture: undefined,
      },
      message: message.message,
      attachments: message.attachments
    }
  })
  return messages;
}
