import { DEFAULT_FILTERS, SORT_ENUM, UrlParamsType, OFFSET_PAGINATION } from "front/typing/filters"
import { StoreSetType } from "front/typing/store"
import { Tags, User } from "front/typing/user"

export type ListStateType = {
    user: User
    like: boolean
}

export type ListType = {
    list: ListStateType[],
    reachedEnd: boolean
}

type HomeListType = {
    filtersList: ListType,
    suggestionList: ListType,
    filters: UrlParamsType,
    sort: SORT_ENUM,
    selectedTags: Tags[],
    suggestionOffset: number
}

const defaultList: ListType = {
    list: [],
    reachedEnd: false
}

const defaultValues: HomeListType = {
    filtersList: defaultList,
    suggestionList: defaultList,
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
    setFilterList: (list: ListType) => void,
    setSuggestionList: (list: ListType) => void,
    updateProfileListLike: ({ listKey, profile_id }: OnLikeProps) => void,
    setFilters: ({ filters, reset }: { filters: UrlParamsType, reset?: boolean }) => void,
    resetFilters: () => void,
    sortChange: (value: SORT_ENUM) => void,
    addSelectedTag: (tag: Tags, wasSelected: boolean) => void,
    suggestionNextOffeset: () => void
}

export const homeSlice = (set: StoreSetType): HomeStoreType => ({
    homeState: defaultValues,
    setFilterList: (list: ListType) => set((state) => ({ ...state, homeState: { ...state.homeState, filtersList: { reachedEnd: list.reachedEnd, list: [...state.homeState.filtersList.list, ...list.list] } } })),
    setSuggestionList: (list: ListType) => set((state) => ({ ...state, homeState: { ...state.homeState, suggestionList: { reachedEnd: list.reachedEnd, list: [...state.homeState.suggestionList.list, ...list.list] } } })),
    updateProfileListLike: ({ listKey, profile_id }: OnLikeProps) => set((state) => {
        const userFound = state.homeState[listKey].list.find(l => l.user.id === profile_id)
        if (userFound) {
            const newList = state.homeState[listKey].list.map(l => l.user.id === profile_id ? { ...l, like: !l.like } : l)
            return {
                ...state,
                homeState: {
                    ...state.homeState,
                    [listKey]: {
                        [listKey]: {
                            ...state.homeState[listKey],
                            list: [...newList]
                        }
                    }
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
            filtersList: {
                ...state.homeState.filtersList,
                list: reset ? [] : state.homeState.filtersList.list,
            },
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
                filtersList: {
                    ...state.homeState.filtersList,
                    list: []
                },
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