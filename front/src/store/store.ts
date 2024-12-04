import { create } from "zustand"
import { AuthStoreType, authSlice } from "front/store/auth.store"
import { ChatStoreType, chatSlice } from "front/store/chat.store"
import { ChatSidebatStoreType, chatSidebarSlice } from "front/store/chatSidebar.store"
import { notificationsSlice, NotificationStoreType } from "front/store/notification.store"
import { alertSlice, AlertStoreType } from "front/store/alert.store"
import { modalSlice, ModalStoreType } from "front/store/modal.store"
import { socketSlice, SocketStoreType } from "./socket.store"

export type StoreType = AuthStoreType & ChatStoreType & ChatSidebatStoreType & AlertStoreType & ModalStoreType & NotificationStoreType & SocketStoreType

export const useStore = create<StoreType>(
    (set) => ({
        ...authSlice(set),
        ...chatSlice(set),
        ...chatSidebarSlice(set),
        ...notificationsSlice(set),
        ...alertSlice(set),
        ...modalSlice(set),
        ...socketSlice(set)
    })
)