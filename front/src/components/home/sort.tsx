import { SORT_ENUM } from "front/typing/filters"
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { sortStyle } from "./sort.style";
import { css } from "styled-system/css";

type SortProps = {
    onChange: (value: number) => void
}
const Sort = ({ onChange }: SortProps) => {
    const slotsStyles = sortStyle.raw()
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(+e.target.value)
    }
    return (
        <div className={css(slotsStyles.sortWrapper)}>
            <select name='list_sorting' onChange={onSelectChange}>
                <option value={SORT_ENUM.DISTANCE_ASC}>Distance</option>
                <option value={SORT_ENUM.DISTANCE_DESC}>Distance</option>
                <option value={SORT_ENUM.AGE_ASC}>Age</option>
                <option value={SORT_ENUM.AGE_DESC}>Age</option>
            </select>
        </div>
    )
}

export default Sort