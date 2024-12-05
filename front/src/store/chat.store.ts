import { ChatType, MessageType } from "front/typing/chat"
import { StoreSetType } from "front/typing/store"

export type ChatStoreType = {
    chat: ChatType | undefined,
    setChat: (chat: ChatType) => void,
    addMessage: (message: MessageType) => void,
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
    resetChat: () => set((state) => ({ ...state, chat: undefined }))
})