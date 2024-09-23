import { User } from "front/typing/user";
import { create } from "zustand";
import Image from 'front/assets/images/Panda.jpeg'

type AuthType = {
    user?: User,
    isLogged: boolean
}

const defaultAuthStore: AuthType = {
    isLogged: false
} 
type AuthStoreType = {
    authStore: AuthType,
    setUser: (user: User) => void,
}

function cleanUserData(user: User): User {
    return {
        ...user,
        img: user.img?? Image,
        age: user.age ?? 0,
        description: user.description ?? 'Aucune description disponible',
        location: user.location ?? 'Localisation non spécifiée',
        interests: user.interests ?? [],
        pictures: user.pictures ?? [],
    };
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    authStore: defaultAuthStore,
    setUser: (user: User) => set((state) => ({...state, user: cleanUserData(user)})) 
}))