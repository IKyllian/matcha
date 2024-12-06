import { User } from "./user"

export type UrlParamsType = {
    min_age?: number
    max_age?: number
    max_pos?: number
    min_fame?: number
    tags?: number[]
    sort?: SORT_ENUM
    display_liked?: boolean
}

export enum SORT_ENUM {
    DISTANCE_ASC,
    DISTANCE_DESC,
    AGE_ASC,
    AGE_DESC
}

export enum SORT_ORDER_ENUM {
    ASC,
    DESC
}

export const getKeyBySortValue = (value: SORT_ENUM): keyof User => {
    return value === SORT_ENUM.DISTANCE_ASC || value === SORT_ENUM.DISTANCE_DESC ?
        'distance' :
        'age'
}

export const DEFAULT_FILTERS = { min_age: 18, max_age: 100, min_fame: 0, max_pos: 1000, display_liked: true }