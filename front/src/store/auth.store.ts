import { User, USERS } from "front/typing/user";
import { create } from "zustand";
import Image from 'front/assets/images/Panda.jpeg'
import { socketMiddleware } from "./socketMidlleware.store";

type AuthStatusType = 'CHECKING' | 'CHECKED'
type AuthType = {
    user?: User,
    authStatus: AuthStatusType
    isLogged: boolean,
    socketInitialized: boolean
}

// const defaultAuthStore: AuthType = {
//     isLogged: true,
//     socketInitialized: false,
//     user: USERS[0]
// }

const defaultAuthStore: AuthType = {
    authStatus: 'CHECKING',
    isLogged: false,
    socketInitialized: false,
}
export type AuthStoreType = {
    authStore: AuthType,
    logUser: (user: Partial<User>) => void,
    setUser: (user: Partial<User>) => void,
    setAuthStatus: (status: AuthStatusType) => void,
    logoutUser: () => void,
}

export const authSlice = (set): AuthStoreType => ({
    authStore: defaultAuthStore,
    logUser: (user: Partial<User>) => set((state) => ({ ...state, authStore: { ...state.authStore, user: user, authStatus: 'CHECKED', isLogged: true } })),
    setUser: (user: Partial<User>) => set((state) => ({ ...state, authStore: { ...state.authStore, user: user } })),
    setAuthStatus: (status: AuthStatusType) => set((state) => ({ ...state, authStore: { ...state.authStore, authStatus: status } })),
    logoutUser: () => set((state) => ({ ...state, authStore: { ...state.authStore, user: undefined, authStatus: 'CHECKED', isLogged: false } })),
})
