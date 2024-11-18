import { Tags } from "front/typing/user"

export type UrlParamsType = {
    min_age?: number,
    max_age?: number,
    max_pos?: number,
    min_fame?: number,
    tags?: Tags[]
}