import { StoreSetType } from "front/typing/store";
import { User } from "front/typing/user";

type AuthStatusType = 'CHECKING' | 'CHECKED'
type AuthType = {
    user?: User,
    token?: string
    authStatus: AuthStatusType
    isLogged: boolean,
    socketInitialized: boolean
    isCompletingAccount: boolean
}

const defaultAuthStore: AuthType = {
    authStatus: 'CHECKING',
    isLogged: false,
    socketInitialized: false,
    isCompletingAccount: false
}
export type AuthStoreType = {
    authStore: AuthType,
    logUser: (user: Partial<User>, token: string) => void,
    setUser: (user: Partial<User>) => void,
    setAuthStatus: (status: AuthStatusType) => void,
    initializeSocket: () => void,
    changeIsCompletingAccount: (value: boolean) => void
    logoutUser: () => void,
}

export const authSlice = (set: StoreSetType): AuthStoreType => ({
    authStore: defaultAuthStore,
    logUser: (user: Partial<User>, token: string) => set((state) => ({ ...state, authStore: { ...state.authStore, user: user, authStatus: 'CHECKED', isLogged: true, token } })),
    setUser: (user: Partial<User>) => set((state) => ({ ...state, authStore: { ...state.authStore, user: user } })),
    setAuthStatus: (status: AuthStatusType) => set((state) => ({ ...state, authStore: { ...state.authStore, authStatus: status } })),
    initializeSocket: () => set((state) => ({ ...state, authStore: { ...state.authStore, socketInitialized: true } })),
    logoutUser: () => set((state) => ({ ...state, authStore: { ...state.authStore, user: undefined, authStatus: 'CHECKED', isLogged: false, token: undefined, socketInitialized: false } })),
    changeIsCompletingAccount: (value: boolean) => set((state) => ({...state, authStore: {...state.authStore, isCompletingAccount: value}}))
})
