import { css, Styles } from "styled-system/css"
import { chipsStyle } from "./chips.style"
import { FaCheck } from "react-icons/fa6"

type ChipProps = {
    value: string,
    classname?: Styles,
    isSelected?: boolean
}

const Chip = ({ value, classname, isSelected }: ChipProps) => {
    const slotsStyles = chipsStyle.raw()
    const dataSelected = isSelected === false ? 0 : 1 // We want to check false but not undefined. TODO: Maybe change this
    return (
        <div className={css(slotsStyles.chip, classname)} data-is-selected={+dataSelected}>
            {isSelected && <FaCheck />}
            {value}
        </div>
    )
}

export default Chip