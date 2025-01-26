import { MessageType } from "front/typing/chat";
import { io, Socket } from "socket.io-client"
import { NotificationType } from "front/typing/notification";
import { StoreSetType } from "front/typing/store";
import { AlertTypeEnum } from "front/typing/alert";

export type SocketStoreType = {
    socket: Socket | undefined,
    initSocket: ({ token }: { token: string }) => void,
    sendMessage: (params: { receiver_id: number, sender_id: number, message: string }) => void;
    socketDisconnect: () => void
}

export const socketSlice = (set: StoreSetType): SocketStoreType => ({
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
            socket.emit("identify", { token })
            state.initializeSocket()
        })

        socket.on('disconnect', () => {
            console.info("socket disconected")
        })

        socket.on('error', (error: { message: string }) => {
            state.addAlert({ type: AlertTypeEnum.ERROR, message: error.message })
        })

        socket.on('receiveMessage', (message: MessageType) => {
            state.addMessage(message)
            state.updateLastMessage(message)
        })

        socket.on('sendNotification', (notification: NotificationType) => {
            state.addNotification(notification)
        })

        socket.on('updateNotification', (notification: NotificationType) => {
            state.updateNotification(notification)
        })

        return {
            ...state, socket
        }
    }),

    socketDisconnect: () => set(state => {
        if (state.socket && state.authStore.token) {
            state.socket.emit('logout', { token: state.authStore.token })
            state.socket.off("receiveMessage")
            state.socket.off("sendNotification")
        }
        return {
            ...state,
            socket: undefined
        }
    })
})