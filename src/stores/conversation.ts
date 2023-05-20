import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'

type Participant = {
  userID: string,
  username: string,
  profilePicture: string,
}

type Source = {
  sourceID: string,
  sourceName?: string
  sourcePicture?: string,
  sourceType: "USER" | "ADMIN",
}

type Message = {
  conversationID: string,
  messageID: string,
  timeStamp: number,
  source: Source,
  message: string,
}
type Conversation = {
  conversationID: string,
  conversationPicture: string,
  updatedAt: number,
  lastActivity: string,
  participants: Participant[],
  messages: Message[],
}


export const useConversationStore = defineStore("conversation", () => {
  const conversations = ref<Conversation[]>([]);
  function getConversationById(conversationId: string) {
    return conversations.value.find((conversation) => conversation.conversationID === conversationId);
  }
  async function fetchConversations() {
    const { data } = await axios.get("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations");
    data.conversations.forEach(conversation => {
      conversations.value.push({
        conversationID: conversation.conversationID,
        conversationPicture: conversation.conversationPic,
        updatedAt: conversation.updatedTime,
        lastActivity: conversation.lastActivity,
        participants: conversation.participants.map((participant) => {
          return {
            userID: participant.userID,
            username: participant.username,
            profilePicture: participant.profilePic.src,
          }
        }),
        messages: []
      })
    });
    console.log("Current conversations", conversations.value)
  }

  async function fetchMessages(conversationID: string) {
    const { data } = await axios.get("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations/" + conversationID + "/messages");
    const conversation = conversations.value.find((conversation) => conversation.conversationID === conversationID);
    if (!conversation) return;
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
      conversation.messages.push(message)
    });
    console.log("Current conversation", conversation)
    return conversation;
  }

  function addMessage(conversationID: string, message: Message) {
    const conversation = conversations.value.find((conversation) => conversation.conversationID === conversationID);
    if (!conversation) return;
    conversation.messages.push(message);
  }

  return { conversations, getConversationById, fetchConversations, fetchMessages, addMessage }
});

