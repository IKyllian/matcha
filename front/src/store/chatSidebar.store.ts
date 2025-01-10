import { ChatSidebarType, MessageType } from "front/typing/chat"
import { StoreSetType } from "front/typing/store"

export type ChatSidebatStoreType = {
    chatSidebar: ChatSidebarType[] | undefined,
    setChatSidebar: (chatSidebar: ChatSidebarType[]) => void,
    updateLastMessage: (message: MessageType) => void,
    resetChatSidebar: () => void
}

export const chatSidebarSlice = (set: StoreSetType): ChatSidebatStoreType => ({
    chatSidebar: undefined,
    setChatSidebar: (chatSidebar: ChatSidebarType[]) => set((state) => ({ ...state, chatSidebar })),
    updateLastMessage: (message: MessageType) => set((state) => {
        if (!state.chatSidebar) return { ...state }
        const connectedUserId = state.authStore.user.id
        const senderId = message.sender_id !== connectedUserId ? message.sender_id : message.receiver_id
        const conv = state.chatSidebar.find((c: ChatSidebarType) => c.liked_user.id === senderId)
        if (conv) {
            conv.last_message = message.message
            conv.last_send_at = message.created_at
            const newChatSidebar = state.chatSidebar.filter((c: ChatSidebarType) => c.liked_user.id !== senderId)
            return { ...state, chatSidebar: [conv, ...newChatSidebar] }
        }
        return { ...state }
    }),
    resetChatSidebar: () => set((state) => ({ ...state, chatSidebar: undefined }))
})