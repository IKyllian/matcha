import { css } from "styled-system/css"
import { chipsStyle } from "./chips.style"
import Chip from "./chip"
import { Tags } from "front/typing/user"

type ChipsListProps = {
    chipsList: Tags[]
}

const ChipsList = ({ chipsList }: ChipsListProps) => {
    const slotsStyles = chipsStyle.raw()
    return (
        <div className={css(slotsStyles.chipsContainer)}>
            {
                chipsList.map((chip, index) => (
                    <Chip key={index} value={chip.tag_name} />
                ))
            }
        </div>
    )
}

export default ChipsList