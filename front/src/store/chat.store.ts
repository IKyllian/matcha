import { ChatType, MessageType } from "front/typing/chat"

export type ChatStoreType = {
    chat: ChatType | undefined,
    setChat: (chat: ChatType) => void,
    addMessage: (message: MessageType) => void,
}

export const chatSlice = (set): ChatStoreType => ({
    chat: undefined,
    setChat: (chat: ChatType) => set((state) => ({ ...state, chat })),
    addMessage: (message: MessageType) => set(state => ({
        ...state,
        chat: {
            ...state.chat,
            messages: [...state.chat.messages, message]
        }
    }))
})