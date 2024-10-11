import { create } from "zustand"
import { AuthStoreType, authSlice } from "front/store/auth.store"
import { ChatStoreType, chatSlice } from "front/store/chat.store"
import { ChatSidebatStoreType, chatSidebarSlice } from "front/store/chatSidebar.store"
import { notificationsSlice } from "front/store/notification.store"
import { MiddlewareType, socketMiddleware } from "front/store/socketMidlleware.store"

export type StoreType = MiddlewareType & AuthStoreType & ChatStoreType & ChatSidebatStoreType

export const useStore = create<StoreType>(
    socketMiddleware(
        (...a) => ({
            ...authSlice(...a),
            ...chatSlice(...a),
            ...chatSidebarSlice(...a),
            ...notificationsSlice(...a)
        })
    )
)