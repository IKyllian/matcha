import { User, USERS } from "front/typing/user";
import { create } from "zustand";
import Image from 'front/assets/images/Panda.jpeg'
import { socketMiddleware } from "./socketMidlleware.store";

type AuthType = {
    user?: User,
    isLogged: boolean,
    socketInitialized: boolean
}

const defaultAuthStore: AuthType = {
    isLogged: true,
    socketInitialized: false,
    user: USERS[0]
}
export type AuthStoreType = {
    authStore: AuthType,
    setUser: (user: Partial<User>) => void,
}

function cleanUserData(user: Partial<User>): User {
    console.info("cleanUserData = ")
    return {
        ...user,
        id: user.id || undefined,
        firstName: user.firstName || '',
        lastname: user.lastname || '',
        username: user.username || '',
        img: user.img ?? Image,
        age: user.age ?? 0,
        description: user.description ?? 'Aucune description disponible',
        location: user.location ?? 'Localisation non spécifiée',
        interests: user.interests ?? [],
        pictures: user.pictures ?? [],
    };
}

export const authSlice = (set): AuthStoreType => ({
    authStore: defaultAuthStore,
    setUser: (user: Partial<User>) => set((state) => ({ ...state, authStore: { ...state.authStore, user: cleanUserData(user) } })),
})
