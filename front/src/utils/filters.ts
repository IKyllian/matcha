import { ListStateType } from "front/store/homeList"
import { SORT_ORDER_ENUM } from "front/typing/filters"
import { User } from "front/typing/user"

type SortListProps = {
    list: ListStateType[]
    key: keyof User
    order: SORT_ORDER_ENUM
}
export const sortListByKey = ({ list, key, order }: SortListProps) => {
    return list.sort(
        (a, b) => order === SORT_ORDER_ENUM.ASC ?
            a.user[key] - b.user[key] :
            a.user[key] + b.user[key]
    )
}