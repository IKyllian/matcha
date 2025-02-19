import { ChatType, MessageType } from "front/typing/chat"
import { StoreSetType } from "front/typing/store"

export type ChatStoreType = {
    chat: ChatType | undefined,
    setChat: (chat: ChatType) => void,
    addMessage: (message: MessageType) => void,
    updateMessage: (message: MessageType) => void,
    deleteMessage: (messageId: MessageType['id']) => void,
    resetChat: () => void
}

export const chatSlice = (set: StoreSetType): ChatStoreType => ({
    chat: undefined,
    setChat: (chat: ChatType) => set((state) => ({ ...state, chat })),
    addMessage: (message: MessageType) => set(state => ({
        ...state,
        chat: state.chat ? {
            ...state.chat,
            messages: [...state.chat.messages, message]
        } : undefined
    })),
    updateMessage: (message: MessageType) => set(state => ({
        ...state,
        chat: {
            ...state.chat,
            messages: [...state.chat.messages.map(m => {
                if (message.id === m.id) {
                    return message
                }
                return m
            })]
        }
    })),
    deleteMessage: (messageId: MessageType['id']) => set(state => ({
        ...state,
        chat: {
            ...state.chat,
            messages: [...state.chat.messages.filter(m => m.id !== messageId)]
        }
    })),
    resetChat: () => set((state) => ({ ...state, chat: undefined }))
})