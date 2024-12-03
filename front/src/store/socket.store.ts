import { MessageType } from "front/typing/chat";
import { io, Socket } from "socket.io-client"

export type SocketStoreType = {
    socket: Socket | undefined,
    initSocket: ({ token }: { token: string }) => void,
    sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => void;
}

export const socketSlice = (set): SocketStoreType => ({
    socket: undefined,
    sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => set(state => {
        if (state.socket) {
            state.socket.emit('sendMessage', params)
        }
        return { ...state }
    }),
    initSocket: ({ token }: { token: string }) => set(state => {
        const socket = io(import.meta.env.VITE_API_URL)

        socket.on('connect', () => {
            console.info("SOCKET CONNECTED")
            socket.emit("identify", token)
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