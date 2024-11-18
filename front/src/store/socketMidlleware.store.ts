import { io } from "socket.io-client";
import { MessageType } from "front/typing/chat";
import { API_URL } from "front/hook/useApi";

// const socket = io(API_URL);

export type MiddlewareType = {
  sendMessage: (params: { chatId: number, userId: number, message: string }) => void;
}

export const socketMiddleware = (config) => (set, get, api) => {
  const initialState = config(set, get, api);
  console.info('SOCKET MIDDLEWARE = ', initialState)
  // if (!initialState.authStore.isAuthenticated) {
  // console.info('INIT socket')
  // socket.on('new_chat_message', (message: MessageType) => {
  //   // set({ messages: [...get().messages, message] });
  //   console.info('new_chat_message = ', message)
  //   initialState.addMessage(message)
  // });

  // socket.on('new_notification', (notification) => {
  //   // set({ notifications: [...get().notifications, notification] });
  // });

  // socket.on('sidebar_update', (data) => {
  //   // set({ sidebarData: data });
  // });
  // initialState.setAuth(true)
  // set({ authStore: {...get()?.authStore, isAuthenticated: true} });
  // }

  return {
    ...config(set, get, api),
    // sendMessage: (params: { chatId: number, userId: number, message: string }) => socket.emit('send_message', params),
  };
};
