import { StoreSetType } from "front/typing/store"
import { User } from "front/typing/user"

export type ListStateType = {
    user: User
    like: boolean
}

type HomeListType = {
    filtersList: ListStateType[],
    suggestionList: ListStateType[]
}

const defaultValues: HomeListType = {
    filtersList: [],
    suggestionList: []
}

export type OnLikeProps = {
    listKey: keyof HomeListType,
    profile_id: number
}

export type HomeStoreType = {
    homeState: HomeListType,
    // setList: ({ listKey, list }: { listKey: keyof HomeListType, list: ListStateType[] }) => void,
    setFilterList: (list: ListStateType[]) => void,
    setSuggestionList: (list: ListStateType[]) => void,
    updateProfileListLike: ({ listKey, profile_id }: OnLikeProps) => void
}

export const homeSlice = (set: StoreSetType): HomeStoreType => ({
    homeState: defaultValues,
    setFilterList: (list: ListStateType[]) => set((state) => ({ ...state, homeState: { ...state.homeState, filtersList: list } })),
    setSuggestionList: (list: ListStateType[]) => set((state) => ({ ...state, homeState: { ...state.homeState, suggestionList: list } })),
    updateProfileListLike: ({ listKey, profile_id }: OnLikeProps) => set((state) => {
        const userFound = state.homeState[listKey].find(l => l.user.id === profile_id)
        if (userFound) {
            const newList = state.homeState[listKey].map(l => l.user.id === profile_id ? { ...l, like: !l.like } : l)
            return {
                ...state,
                homeState: {
                    ...state.homeState,
                    [listKey]: [
                        ...newList
                    ]
                }
            }
        }
        return { ...state }
    })
})