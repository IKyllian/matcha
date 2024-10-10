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
    // user: USERS[0]
}
export type AuthStoreType = {
    authStore: AuthType,
    logUser: (user: Partial<User>) => void,
    setUser: (user: Partial<User>) => void,
    setAuthStatus: (status: AuthStatusType) => void,
    logoutUser: () => void,
}

// function cleanUserData(user: Partial<User>): User {
//     console.info("cleanUserData = ")
//     return {
//         ...user,
//         id: user.id || undefined,
//         password: user.password || '',
//         emi
//         firstname: user.firstname || '',
//         lastname: user.lastname || '',
//         username: user.username || '',
//         img: user.img ?? Image,
//         age: user.age ?? 0,
//         description: user.description ?? 'Aucune description disponible',
//         location: user.location ?? 'Localisation non spécifiée',
//         interests: user.interests ?? [],
//         pictures: user.pictures ?? [],
//     };
// }

export const authSlice = (set): AuthStoreType => ({
    authStore: defaultAuthStore,
    logUser: (user: Partial<User>) => set((state) => ({ ...state, authStore: { ...state.authStore, user: user, authStatus: 'CHECKED', isLogged: true } })),
    setUser: (user: Partial<User>) => set((state) => ({ ...state, authStore: { ...state.authStore, user: user } })),
    setAuthStatus: (status: AuthStatusType) => set((state) => ({ ...state, authStore: { ...state.authStore, authStatus: status } })),
    logoutUser: () => set((state) => ({ ...state, authStore: { ...state.authStore, user: undefined, authStatus: 'CHECKED' } })),
})
