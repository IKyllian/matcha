import { ChatType } from "front/typing/chat"
import { create } from "zustand"

type ChatSidebatStoreType = {
    chat: ChatType | undefined,
    setChat: (chat: ChatType) => void,
}

export const useChatStore = create<ChatSidebatStoreType>((set) => ({
    chat: undefined,
    setChat: (chat: ChatType) => set((state) => ({ ...state, chat }))
}))