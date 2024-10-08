import { SetStateAction } from "react"
import { chipSelectStyle } from "./chipSelect.style"
import { css } from "styled-system/css"
import Chip from "./chip"

type ChypeSelectType = {
    selectedChips: string[]
    onChipClick: (chip: string, wasSelected: boolean) => void
}

const CHIPS = [
    'Musique',
    'Gaming',
    'Tech',
    'Lecture',
    'Voyage',
    'Cinema',
    'Sport',
    'Politique',
    'Science',
    'Art',
    'Divertissement',
]

const ChipSelect = ({ selectedChips, onChipClick }: ChypeSelectType) => {
    const slotsStyles = chipSelectStyle.raw()
    return (
        <div className={css(slotsStyles.selectContainer)}>
            <div className={css(slotsStyles.chipContainer)}>
                {CHIPS.map((chip, index) => {
                    const isSelected = selectedChips.some(c => c === chip)
                    return (
                        <div key={chip} onClick={() => onChipClick(chip, isSelected)}>
                            <Chip key={index} value={chip} classname={slotsStyles.inputChip} isSelected={isSelected} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChipSelect