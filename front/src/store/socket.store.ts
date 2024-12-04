import { MessageType } from "front/typing/chat";
import { io, Socket } from "socket.io-client"
import { StoreType } from "./store";

export type SocketStoreType = {
    socket: Socket | undefined,
    initSocket: ({ token }: { token: string }) => void,
    sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => void;
}

export const socketSlice = (set: { (partial: StoreType | Partial<StoreType> | ((state: StoreType) => StoreType | Partial<StoreType>), replace?: false): void; (state: StoreType | ((state: StoreType) => StoreType), replace: true): void; (arg0: { (state: any): any; (state: any): any; }): void; }): SocketStoreType => ({
    socket: undefined,
    sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => set(state => {
        if (state.socket && state.authStore.token) {
            state.socket.emit('sendMessage', { ...params, token: state.authStore.token })
        }
        return { ...state }
    }),
    initSocket: ({ token }: { token: string }) => set(state => {
        const socket = io(import.meta.env.VITE_API_URL)

        socket.on('connect', () => {
            console.info("SOCKET CONNECTED")
            socket.emit("identify", { token })
            state.initializeSocket()
        });

        socket.on('disconnect', () => {
            console.info("DISCONECTED")
        });

        socket.on('error', (message: string) => {
            console.info('Socket Error message = ', message)
        })

        socket.on('receiveMessage', (message: MessageType) => {
            console.info("message = ", message)
            state.addMessage(message)
        });

        return {
            ...state, socket
        }
    })
})