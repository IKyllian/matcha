import { css } from "styled-system/css"
import { chipsStyle } from "./chips.style"


type ChipsListProps = {
    chipsList: string[]
}

const Chip = ({ value, classname }: { value: string, classname: string }) => (
    <div className={classname}>
        {value}
    </div>
)

const ChipsList = ({ chipsList }: ChipsListProps) => {
    const slotsStyles = chipsStyle.raw()
    return (
        <div className={css(slotsStyles.chipsContainer)}>
            {
                chipsList.map((chip, index) => (
                    <Chip key={index} value={chip} classname={css(slotsStyles.chip)} />
                ))
            }
        </div>
    )
}

export default ChipsList