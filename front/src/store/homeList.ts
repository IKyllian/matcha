import { DEFAULT_FILTERS, getKeyBySortValue, SORT_ENUM, UrlParamsType } from "front/typing/filters"
import { StoreSetType } from "front/typing/store"
import { User } from "front/typing/user"
import { sortListByKey } from "front/utils/filters"

export type ListStateType = {
    user: User
    like: boolean
}

type HomeListType = {
    filtersList: ListStateType[],
    suggestionList: ListStateType[],
    filters: UrlParamsType,
    sort: SORT_ENUM
}

const defaultValues: HomeListType = {
    filtersList: [],
    suggestionList: [],
    filters: DEFAULT_FILTERS,
    sort: SORT_ENUM.DISTANCE_ASC
}

export type OnLikeProps = {
    listKey: Extract<keyof HomeListType, 'filtersList' | 'suggestionList'>
    profile_id: number
}

export type HomeStoreType = {
    homeState: HomeListType,
    // setList: ({ listKey, list }: { listKey: keyof HomeListType, list: ListStateType[] }) => void,
    setFilterList: (list: ListStateType[]) => void,
    setSuggestionList: (list: ListStateType[]) => void,
    updateProfileListLike: ({ listKey, profile_id }: OnLikeProps) => void,
    setFilters: (filters: UrlParamsType) => void,
    resetFilters: () => void,
    sortChange: (value: SORT_ENUM) => void
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
    }),
    setFilters: (filters: UrlParamsType) => set((state) => ({ ...state, homeState: {...state.homeState, filters } })),
    resetFilters: () => set((state) => ({ ...state, homeState: {...state.homeState, filters: DEFAULT_FILTERS } })),
    sortChange: (value: SORT_ENUM) => set((state) => {
        const newFilterList = sortListByKey({ list: state.homeState.filtersList, order: value % 2, key: getKeyBySortValue(value) })
        return {
            ...state,
            homeState: {
                ...state.homeState,
                filtersList: newFilterList,
                sort: value
            }
        }
    })
})