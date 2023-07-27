import type { Message } from "@/types/message";
import { defineStore, type Store } from "pinia";
import { useConversationStore, type ConversationStore } from "./conversation";

interface IWebsocketStore {
  socket: WebSocket | null,
  available: boolean
}

const websocket_api_id = import.meta.env.VITE_BOTIO_WEBSOCKET_API_ID;
if (websocket_api_id === undefined) {
  throw new Error("VITE_WEBSOCKET_API_ID is undefined");
}
export const useWebsocketStore = defineStore("websocket", {
  state: (): IWebsocketStore => ({
    socket: null,
    available: true
  }),
  actions: {
    connect(shopID: string) {
      if (shopID === "-1") return;
      if (!this.available) return;
      this.available = false;
      const url = `wss://${websocket_api_id}.execute-api.ap-southeast-1.amazonaws.com/dev?shopID=${shopID}`
      const socket = new WebSocket(url);
      const conversationStore = useConversationStore()
      socket.onmessage = (event) => {
        onMessageCallback(conversationStore, event)
      }

      socket.onopen = () => {
        this.available = true;
        console.log("websocket connected")
      }
      socket.onclose = () => {
        console.log("websocket disconnected")
        this.connect(shopID)
      }
    },
    disconnect() {
      this.socket?.close();
    },

  }
})

function onMessageCallback(conversationStore: ConversationStore, event: MessageEvent<any>) {
  const data: { action: string, message: any } = JSON.parse(event.data)
  console.log(data)
  switch (data.action) {
    case "broadcast":
    case "relay":
      const message: Message = data.message
      conversationStore.addReceivedMessage(message)
      break;
    default:
      console.error(`unknown action: ${data.action}`)
  }
}
  // State
