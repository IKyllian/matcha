import { DEFAULT_FILTERS, SORT_ENUM, UrlParamsType, OFFSET_PAGINATION } from "front/typing/filters"
import { StoreSetType } from "front/typing/store"
import { Tags, User } from "front/typing/user"

export type ListStateType = {
    user: User
    like: boolean
}

type HomeListType = {
    filtersList: ListStateType[],
    suggestionList: ListStateType[],
    filters: UrlParamsType,
    sort: SORT_ENUM,
    selectedTags: Tags[],
    suggestionOffset: number
}

const defaultValues: HomeListType = {
    filtersList: [],
    suggestionList: [],
    filters: DEFAULT_FILTERS,
    sort: SORT_ENUM.DISTANCE_ASC,
    selectedTags: [],
    suggestionOffset: 0
}

export type OnLikeProps = {
    listKey: Extract<keyof HomeListType, 'filtersList' | 'suggestionList'>
    profile_id: number
}

export type HomeStoreType = {
    homeState: HomeListType,
    setFilterList: (list: ListStateType[]) => void,
    setSuggestionList: (list: ListStateType[]) => void,
    updateProfileListLike: ({ listKey, profile_id }: OnLikeProps) => void,
    setFilters: ({ filters, reset }: { filters: UrlParamsType, reset?: boolean }) => void,
    resetFilters: () => void,
    sortChange: (value: SORT_ENUM) => void,
    addSelectedTag: (tag: Tags, wasSelected: boolean) => void,
    suggestionNextOffeset: () => void
}

export const homeSlice = (set: StoreSetType): HomeStoreType => ({
    homeState: defaultValues,
    setFilterList: (list: ListStateType[]) => set((state) => ({ ...state, homeState: { ...state.homeState, filtersList: [...state.homeState.filtersList, ...list] } })),
    setSuggestionList: (list: ListStateType[]) => set((state) => ({ ...state, homeState: { ...state.homeState, suggestionList: [...state.homeState.suggestionList, ...list] } })),
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
    setFilters: ({ filters, reset = false }: { filters: UrlParamsType, reset?: boolean }) => set((state) =>
    ({
        ...state,
        homeState: {
            ...state.homeState,
            filtersList: reset ? [] : state.homeState.filtersList,
            filters: {
                ...filters,
                offset: reset ? 0 : state.homeState.filters.offset + OFFSET_PAGINATION
            }
        }
    })
    ),
    resetFilters: () => set((state) => ({ ...state, homeState: { ...state.homeState, filters: DEFAULT_FILTERS, selectedTags: [] } })),
    sortChange: (value: SORT_ENUM) => set((state) => {
        // const newFilterList = sortListByKey({ list: state.homeState.filtersList, order: value % 2, key: getKeyBySortValue(value) })
        return {
            ...state,
            homeState: {
                ...state.homeState,
                filtersList: [],
                sort: value
            }
        }
    }),
    addSelectedTag: (tag: Tags, wasSelected: boolean) => set((state) => ({
        ...state,
        homeState: {
            ...state.homeState,
            selectedTags:
                wasSelected ?
                    [...state.homeState.selectedTags.filter(c => c.id !== tag.id)] :
                    [...state.homeState.selectedTags, tag]

        }
    })),
    suggestionNextOffeset: () => set((state) => ({ ...state, homeState: { ...state.homeState, suggestionOffset: state.homeState.suggestionOffset + OFFSET_PAGINATION } }))
})