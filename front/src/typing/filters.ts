import { User } from "./user"

export type UrlParamsType = {
    min_age?: number
    max_age?: number
    max_pos?: number
    min_fame?: number
    tags?: number[]
    sort?: SORT_ENUM
    display_liked?: boolean
    offset?: number

    url_identifier?: string
}

export enum SORT_ENUM {
    DISTANCE_ASC,
    DISTANCE_DESC,
    AGE_ASC,
    AGE_DESC,
    FAME_ASC,
    FAME_DESC
}

export enum SORT_ORDER_ENUM {
    ASC,
    DESC
}

export const getKeyBySortValue = (value: SORT_ENUM): keyof User => {
    switch (value) {
        case SORT_ENUM.DISTANCE_ASC:
        case SORT_ENUM.DISTANCE_DESC:
            return 'distance'
        case SORT_ENUM.AGE_ASC:
        case SORT_ENUM.AGE_DESC:
            return 'age'
        default:
            return 'fame_rating'

    }
}

export const DEFAULT_FILTERS = { min_age: 18, max_age: 100, min_fame: 0, max_pos: 1000, display_liked: true, offset: 0 }

export const OFFSET_PAGINATION = 100