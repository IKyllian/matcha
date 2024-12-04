// import { io, Socket } from "socket.io-client";
// import { MessageType } from "front/typing/chat";

// let socket: Socket | undefined = undefined;
// export type MiddlewareType = {
//   sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => void;
//   initSocket: () => void;
// }

// export const socketMiddleware = (config) => (set, get, api) => {
//   const initialState = config(set, get, api);

//   if (initialState.authStore.isLogged && !initialState.authStore.socketInitialized) {
//     console.info("Create instance")
//     socket = io(import.meta.env.VITE_API_URL);

//     socket.on('connect', () => {
//       console.info("CONNECTED")
//       initialState.initializeSocket()
//     });

//     socket.on('disconnect', () => {
//       console.info("DISCONECTED")
//     });

//     socket.on('error', (message: string) => {
//       console.info('Socket Error message = ', message)
//     })

//     socket.on('receiveMessage', (message: MessageType) => {
//       console.info("message = ", message)
//       initialState.addMessage(message)
//     });

//     socket.on('new_notification', (notification) => {

//     });

//     socket.on('sidebar_update', (data) => {

//     });
//   }

//   return {
//     ...config(set, get, api),
//     // sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => {
//     //   console.info("SEND MESSAGE", socket)
//     //   socket?.emit('sendMessage', params)
//     // }
//   };
// };
