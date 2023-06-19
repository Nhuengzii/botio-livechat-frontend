import type { Conversation } from "@/types/conversation";
type ConversationsMap = Map<string, Conversation>;

function conversationsMap2SortedArray(conversationsMap: ConversationsMap): Conversation[] {
  const conversations: Conversation[] = [];
  conversationsMap.forEach((conversation) => {
    conversations.push(conversation);
  });
  conversations.sort((a, b) => {
    return b.updatedTime - a.updatedTime;
  });
  return conversations;
}

export type { ConversationsMap }
export { conversationsMap2SortedArray }
