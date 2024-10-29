import { SetStateAction } from "react"
import { chipSelectStyle } from "./chipSelect.style"
import { css } from "styled-system/css"
import Chip from "./chip"
import { Tags } from "front/typing/user"

type ChypeSelectType = {
    selectedChips: Tags[]
    onChipClick: (chip: Tags, wasSelected: boolean) => void
}

const CHIPS = [
    { id: 0, tag_name: 'Musique' },
    { id: 1, tag_name: 'Gaming' },
    { id: 2, tag_name: 'Tech' },
    { id: 3, tag_name: 'Lecture' },
    { id: 5, tag_name: 'Voyage' },
    { id: 6, tag_name: 'Cinema' },
    { id: 7, tag_name: 'Sport' },
    { id: 8, tag_name: 'Politique' },
    { id: 9, tag_name: 'Science' },
    { id: 10, tag_name: 'Art' },
    { id: 11, tag_name: 'Divertissement' },
]

const ChipSelect = ({ selectedChips, onChipClick }: ChypeSelectType) => {
    const slotsStyles = chipSelectStyle.raw()
    return (
        <div className={css(slotsStyles.selectContainer)}>
            <div className={css(slotsStyles.chipContainer)}>
                {CHIPS.map((chip, index) => {
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