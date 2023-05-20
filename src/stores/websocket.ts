import { defineStore } from "pinia";
import { useFacebookStore } from "@/stores/facebook";
import type { Message } from "@/types/conversation";

export const useWebsocketStore = defineStore('websocket', {
  state: () => {
    return {
      connection: null as WebSocket | null,
      disableAutoConnect: true,
    }
  },
  actions: {
    connect() {
      if (this.connection === null || this.disableAutoConnect) {
        return
      }
      this.connection = new WebSocket('wss://mgec4plwk7.execute-api.ap-southeast-1.amazonaws.com/test?shopId=1')
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
        const data = JSON.parse(event.data);
        console.log(JSON.stringify(data, null, 2))

        const newMessage: Message = {
          conversationID: data.conversationID,
          messageID: data.messageID,
          timeStamp: data.timestamp,
          source: {
            sourceID: data.source.userID,
            sourceType: data.source.userType === "user" ? "USER" : "ADMIN",
          },
          message: data.message,
        }
        useFacebookStore().addMessage(newMessage.conversationID, newMessage);

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