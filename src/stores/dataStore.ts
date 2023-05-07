import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Participants = {
    UserId:number | string
    UserName:string
    ProfilePicture:URL | string
}

type DataConversation = {
    ConversationId: URL | string,
    ConversationPicture: URL | string,
    lastActivity: string,
    UpdateTime: Date,
    Participants: Array<Participants>,
    Tagname?: Array<String>
}


export const useDataMessageStore = defineStore('counter', () => {
    const count = ref(0)
    const conversation = ref<DataConversation[]>([
        {
            ConversationId: "1",
            ConversationPicture: "",
            lastActivity: "Hello",
            UpdateTime: new Date(),
            Participants: [
                {
                    UserId: "1",
                    UserName: "John",
                    ProfilePicture: "https://picsum.photos/200/300"
                },
            ],
            Tagname: [
                "cool"
            ]
        },
        {
            ConversationId: "2",
            ConversationPicture: "https://picsum.photos/200/300",
            lastActivity: "send a sticker",
            UpdateTime: new Date(),
            Participants: [
                {
                    UserId: "1",
                    UserName: "Chawrai",
                    ProfilePicture: "https://picsum.photos/200/300"
                },
            ],
            Tagname: [
                "cool"
            ]
        },
        {
            ConversationId: "3",
            ConversationPicture: "https://picsum.photos/200/300",
            lastActivity: "Hello",
            UpdateTime: new Date(),
            Participants: [
                {
                    UserId: "1",
                    UserName: "John",
                    ProfilePicture: "https://picsum.photos/200/300"
                },
            ],
            Tagname: [
                "cool"
            ]
        }
    ]);

    

    return { conversation }
})
