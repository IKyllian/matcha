import { chipSelectStyle } from "./chipSelect.style"
import { css } from "styled-system/css"
import Chip from "./chip"
import { Tags } from "front/typing/user"

type ChypeSelectType = {
    selectedChips: Tags[]
    chips: Tags[]
    onChipClick: (chip: Tags, wasSelected: boolean) => void
}


const ChipSelect = ({ selectedChips, onChipClick, chips }: ChypeSelectType) => {
    const slotsStyles = chipSelectStyle.raw()
    return (
        <div className={css(slotsStyles.selectContainer)}>
            <div className={css(slotsStyles.chipContainer)}>
                {chips.map((chip, index) => {
                    const isSelected = selectedChips.some(c => c.id === chip.id)
                    return (
                        <div key={chip.tag_name} onClick={() => onChipClick(chip, isSelected)}>
                            <Chip key={index} value={chip.tag_name} classname={slotsStyles.inputChip} isSelected={isSelected} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChipSelect