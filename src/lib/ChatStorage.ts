import type { Message } from "@/types/message"

class ChatStorage {
  private _storageSize: number
  private _storage: Map<string, { chat: Message[], lastAccessTime: number }> = new Map<string, { chat: Message[], lastAccessTime: number }>();
  private _currentChatSize: number;
  constructor(storageSize: number) {
    this._storageSize = storageSize;
    this._currentChatSize = 0;
  }

  public get storageSize(): number {
    return this._storageSize;
  }

  public get currentChatSize(): number {
    return this._currentChatSize;
  }

  // add chat to storage
  public addChat(conversationId: string, chat: Message[]): void {
    if (this._storage.has(conversationId)) {
      this._storage.set(conversationId, { chat: chat, lastAccessTime: Date.now() });
      return;
    }
    if (this._currentChatSize >= this._storageSize) {
      this._storage.delete(this._getOldestConversationId());
      this._storage.set(conversationId, { chat: chat, lastAccessTime: Date.now() });
    }
  }

  public getChat(conversationId: string): Message[] | null {
    if (this._storage.has(conversationId)) {
      const chat = this._storage.get(conversationId);
      if (chat) {
        chat.lastAccessTime = Date.now();
        return chat.chat;
      }
    }
    return null;
  }

  private _getOldestConversationId(): string {
    let oldestConversationId = "";
    let oldestConversationLastAccessTime = Date.now();
    this._storage.forEach((value, key) => {
      if (value.lastAccessTime < oldestConversationLastAccessTime) {
        oldestConversationId = key;
        oldestConversationLastAccessTime = value.lastAccessTime;
      }
    });
    return oldestConversationId;
  }


}

export { ChatStorage }
