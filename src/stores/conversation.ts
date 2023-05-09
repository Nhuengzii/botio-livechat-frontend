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
      lastActivity: "สวัสดี",
      participants: [
        {
          userId: "2",
          username: "Nhuengzii",
          profilePicture: "https://avatars.githubusercontent.com/u/86766644?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "3",
      conversationPicture: "",
      updatedAt: 234789229,
      lastActivity: "Jomz send sticker",
      participants: [
        {
          userId: "3",
          username: "Jomz Pan",
          profilePicture: "https://avatars.githubusercontent.com/u/82075904?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "4",
      conversationPicture: "",
      updatedAt: 23478922222,
      lastActivity: "You send message",
      participants: [
        {
          userId: "4",
          username: "Jirat Meewassana",
          profilePicture: "https://avatars.githubusercontent.com/u/64889751?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "5",
      conversationPicture: "",
      updatedAt: 23478,
      lastActivity: "Nath Prachayakul send video",
      participants: [
        {
          userId: "5",
          username: "Nath Prachayakul",
          profilePicture: "https://avatars.githubusercontent.com/u/35620424?v=4"
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "6",
      conversationPicture: "",
      updatedAt: 2347892,
      lastActivity: "SinlnW ส่งเฉลย",
      participants: [
        {
          userId: "6",
          username: "SinlnW",
          profilePicture: "https://avatars.githubusercontent.com/u/29594945?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "7",
      conversationPicture: "",
      updatedAt: 2349229,
      lastActivity: "Apimook Tratree ส่งข้อความ",
      participants: [
        {
          userId: "7",
          username: "Apimook Tratree",
          profilePicture: "https://avatars.githubusercontent.com/u/57552159?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "8",
      conversationPicture: "",
      updatedAt: 23478922238384,
      lastActivity: "Worakorn Koonawootrittriron ส่งรูปภาพ",
      participants: [
        {
          userId: "8",
          username: "Worakorn Koonawootrittriron",
          profilePicture: "https://avatars.githubusercontent.com/u/113242555?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "8",
      conversationPicture: "",
      updatedAt: 2349229,
      lastActivity: "GolfGrab ส่งข้อความ",
      participants: [
        {
          userId: "8",
          username: "GolfGrab",
          profilePicture: "https://avatars.githubusercontent.com/u/70707895?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "9",
      conversationPicture: "",
      updatedAt: 2347892228384,
      lastActivity: "คุณส่งรูปภาพ",
      participants: [
        {
          userId: "8",
          username: "Katid Supawee",
          profilePicture: "https://avatars.githubusercontent.com/u/90249534?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "10",
      conversationPicture: "",
      updatedAt: 234789222383842,
      lastActivity: "คุณส่งรูปภาพ",
      participants: [
        {
          userId: "10",
          username: "Chanrich Pisitjing",
          profilePicture: "https://avatars.githubusercontent.com/u/12080533?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "11",
      conversationPicture: "",
      updatedAt: 2349229,
      lastActivity: "Phusit Somboonyingsuk ส่งข้อความ",
      participants: [
        {
          userId: "11",
          username: "Phusit Somboonyingsuk",
          profilePicture: "https://avatars.githubusercontent.com/u/56222561?v=4",
        }
      ]
    },
    {
      shopId: "1",
      pageId: "1",
      conversationId: "12",
      conversationPicture: "",
      updatedAt: 234789222884,
      lastActivity: "คุณส่งรูปภาพ",
      participants: [
        {
          userId: "12",
          username: "Champ Tawachai",
          profilePicture: "https://avatars.githubusercontent.com/u/26870250?v=4",
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

