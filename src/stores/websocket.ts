import { defineStore } from "pinia";
import { useConversationsStore } from "@/stores/conversations";
import type { Message, StandardMessage } from "@/types/conversation";

export const useWebsocketStore = defineStore('websocket', {
  state: () => {
    return {
      connection: null as WebSocket | null,
      disableAutoConnect: true,
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
      this.connection.onmessage = (event) => {
        const data: StandardMessage = JSON.parse(event.data);
        console.log(JSON.stringify(data, null, 2))
        const newMessage: Message = {
          messageID: data.messageID,
          timeStamp: data.timestamp,
          source: {
            sourceID: data.source.userID,
            sourceType: data.source.userType.toUpperCase() as "USER" | "ADMIN",
          },
          message: data.message,
          conversationID: data.conversationID,
          attachments: data.attachments,
        }
        useConversationsStore().addMessageFromWebsocket(data.conversationID, newMessage, data.platform.toLowerCase());

      }
    },
    disconnect() {
      if (this.connection) {
        this.connection.close()
        console.log('disconnected')
        this.connection = null
      }
    }
  },
})
