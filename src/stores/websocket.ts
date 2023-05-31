import { defineStore } from "pinia";
import { useConversationsStore } from "@/stores/conversations";
import type { Message, StandardMessage } from "@/types/conversation";

export const useWebsocketStore = defineStore('websocket', {
  state: () => {
    return {
      connection: null as WebSocket | null,
      disableAutoConnect: true,
      conversationStore: useConversationsStore()
    }
  },
  actions: {
    connect() {
      if (this.connection === null && this.disableAutoConnect) {
        return
      }
      const botio_websocket_api_id = import.meta.env.VITE_BOTIO_WEBSOCKET_API_ID as string
      if (botio_websocket_api_id === undefined) {
        console.error("VITE_BOTIO_WEBSOCKET_API_ID is not defined")
        return
      }
      const websocketEndpoint = `wss://${botio_websocket_api_id}.execute-api.ap-southeast-1.amazonaws.com/test?shopId=1`
      this.connection = new WebSocket(websocketEndpoint)
      this.connection.onopen = () => {
        console.log('connected')
      }
      this.connection.onclose = () => {
        console.log('disconnected')
        this.connection = null
      }
      this.connection.onerror = (error) => {
        console.log('failed to connect', error)
        this.connection = null
      }
      this.connection.onmessage = async (event) => {
        const incommingEvent: { action: string, message: any } = JSON.parse(event.data);
        switch (incommingEvent.action) {
          case "broadcast":
            const message: Message = incommingEvent.message;
            this.conversationStore.addMessageFromWebsocket(message.conversationID, message, "facebook");
            return;
            break;
          case "userMessage":
            let data: StandardMessage = JSON.parse(incommingEvent.message);
            const currentConversation = this.conversationStore.getConversationById(data.conversationID, data.platform.toLowerCase());
            if (currentConversation === undefined) {
              console.log("Conversation not found in usermessage action");
              return;
            }
            const conversationPicture = currentConversation.participants[0].profilePicture
            const newMessage: Message = {
              messageID: data.messageID,
              timeStamp: data.timestamp,
              source: {
                sourceID: data.source.userID,
                sourceType: data.source.type.toUpperCase() as "USER" | "ADMIN",
                sourcePicture: conversationPicture,
              },
              message: data.message,
              conversationID: data.conversationID,
              attachments: data.attachments,
            }
            try {
              await this.conversationStore.addMessageFromWebsocket(data.conversationID, newMessage, data.platform.toLowerCase());
            } catch {
              console.log("Error adding message from websocket")
            }
            break;
          case "typing_broadcast":
            const typingData: { conversationID: string, platform: string, typing: boolean } = incommingEvent.message;
            this.conversationStore.conversationsRaw[typingData.platform.toLowerCase()].raw[typingData.conversationID].messages.someoneTyping = typingData.typing;
            break;
          case "defalt":
            console.log("Incomming WebSocket Default");
        }

      }
    },
    disconnect() {
      if (this.connection) {
        this.connection.close()
        console.log('disconnected')
        this.connection = null
      }
    },
    broadcastMessage(message: Message, platform: string) {
      if (!this.connection) {
        console.log("No connection");
        return;
      }
      this.connection.send(JSON.stringify({ action: "broadcast", message: message, platform: platform }));
    },
    broadcastTypingEvent(conversationID: string, platform: string, typing: boolean) {
      if (!this.connection) {
        console.log("No connection");
        return;
      }
      this.connection.send(JSON.stringify({ action: "typing_broadcast", message: { conversationID: conversationID, platform: platform, typing: typing } }));
    }
  },
})
