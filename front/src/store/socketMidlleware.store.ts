import { io } from "socket.io-client";
import { create } from "zustand";
import { authSlice, AuthStoreType } from "./user.store";
import { chatSlice, ChatStoreType } from './chat.store';
import { chatSidebarSlice, ChatSidebatStoreType } from "./chatSidebar.store";
import { MessageType } from "front/typing/chat";
import { notificationsSlice } from "./notification.store";

const socket = io('http://localhost:3000');

export type MiddlewareType = {
  sendMessage: (params: { chatId: number, userId: number, message: string }) => void;
}

export const socketMiddleware = (config) => (set, get, api) => {
  const initialState = config(set, get, api);
  console.info('SOCKET MIDDLEWARE = ', initialState)
  // if (!initialState.authStore.isAuthenticated) {
    // console.info('INIT socket')
    socket.on('new_chat_message', (message: MessageType) => {
      // set({ messages: [...get().messages, message] });
      console.info('new_chat_message = ', message)
      initialState.addMessage(message)
    });

    socket.on('new_notification', (notification) => {
      // set({ notifications: [...get().notifications, notification] });
    });

    socket.on('sidebar_update', (data) => {
      // set({ sidebarData: data });
    });
    // initialState.setAuth(true)
    // set({ authStore: {...get()?.authStore, isAuthenticated: true} });
  // }

  return {
    ...config(set, get, api),
    sendMessage: (params: { chatId: number, userId: number, message: string }) => socket.emit('send_message', params),
  };
};


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
