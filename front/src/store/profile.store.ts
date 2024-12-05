import { Picked, StoreSetType } from "front/typing/store"
import { User } from "front/typing/user"

export type ProfileStateType = {
    user: User
    like: boolean
    block: boolean
}

export type ProfileStoreType = {
    profile: ProfileStateType | undefined,
    setProfile: (profile: ProfileStateType) => void,
    updateProfileStatus: ({ user_id, is_connected }: { user_id: number, is_connected: boolean }) => void
    updateProfileBooleanByKey: ({ key }: { key: keyof ProfileStateType }) => void
}

export const profileSlice = (set: StoreSetType): ProfileStoreType => ({
    profile: undefined,
    setProfile: (profile: ProfileStateType) => set((state) => ({ ...state, profile })),
    updateProfileStatus: ({ user_id, is_connected }: { user_id: number, is_connected: boolean }) => set((state) => {
        const { profile } = state
        if (profile && profile.user.id === user_id) {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    user: {
                        ...state.profile.user,
                        is_connected
                    }
                }
            }
        }
        return {
            ...state
        }
    }),
    updateProfileBooleanByKey: ({ key }) => set((state) => {
        return {
            ...state,
            profile: {
                ...state.profile,
                [key]: !state.profile[key]
            }
        }
    })
})