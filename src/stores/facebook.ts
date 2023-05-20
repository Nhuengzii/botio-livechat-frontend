import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'
import type { Conversation, Message } from "@/types/conversation";



export const useFacebookStore = defineStore("facebook", () => {
  const conversations = ref<Conversation[]>([]);
  function getConversationById(conversationId: string) {
    return conversations.value.find((conversation) => conversation.conversationID === conversationId);
  }
  async function fetchConversations() {
    const { data } = await axios.get("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations");
    conversations.value = [];
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
        messages: { "isAlreadyFetch": false, "messages": [] },
      })
    });
    console.log("Current conversations", conversations.value)
  }

  async function fetchMessages(conversationID: string) {
    const conversation = conversations.value.find((conversation) => conversation.conversationID === conversationID);
    if (!conversation) return;
    if (conversation.messages.isAlreadyFetch) return conversation;
    const { data } = await axios.get("https://ut9v4vi439.execute-api.ap-southeast-1.amazonaws.com/test/shops/1/facebook/108362942229009/conversations/" + conversationID + "/messages");
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
  }

  function addMessage(conversationID: string, message: Message) {
    const conversation = conversations.value.find((conversation) => conversation.conversationID === conversationID);
    if (!conversation) return;
    conversation.messages.messages.push(message);
  }

  return { conversations, getConversationById, fetchConversations, fetchMessages, addMessage }
});

