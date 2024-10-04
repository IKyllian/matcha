import { ChatSidebarType } from "front/typing/chat"
import { create } from "zustand"

export type ChatSidebatStoreType = {
    chatSidebar: ChatSidebarType[] | undefined,
    setChatSidebar: (chatSidebar: ChatSidebarType[]) => void,
}

export const chatSidebarSlice = (set): ChatSidebatStoreType => ({
    chatSidebar: undefined,
    setChatSidebar: (chatSidebar: ChatSidebarType[]) => set((state) => ({ ...state, chatSidebar }))
})