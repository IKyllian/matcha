import { ChatSidebarType } from "front/typing/chat"
import { create } from "zustand"

type ChatSidebatStoreType = {
    chatSidebar: ChatSidebarType[] | undefined,
    setChatSidebar: (chatSidebar: ChatSidebarType[]) => void,
}

export const useChatSidebarStore = create<ChatSidebatStoreType>((set) => ({
    chatSidebar: undefined,
    setChatSidebar: (chatSidebar: ChatSidebarType[]) => set((state) => ({ ...state, chatSidebar }))
}))