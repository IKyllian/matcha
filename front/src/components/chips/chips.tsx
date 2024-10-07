import { css } from "styled-system/css"
import { chipsStyle } from "./chips.style"
import Chip from "./chip"

type ChipsListProps = {
    chipsList: string[]
}

const ChipsList = ({ chipsList }: ChipsListProps) => {
    const slotsStyles = chipsStyle.raw()
    return (
        <div className={css(slotsStyles.chipsContainer)}>
            {
                chipsList.map((chip, index) => (
                    <Chip key={index} value={chip} />
                ))
            }
        </div>
    )
}

export default ChipsList