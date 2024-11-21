import { chipSelectStyle } from "./chipSelect.style"
import { css } from "styled-system/css"
import Chip from "./chip"
import { Tags } from "front/typing/user"
import AddTagForm from "front/components/chips/addTagForm"
import SearchTag from "front/components/chips/searchTag"
import { useCallback, useState } from "react"
import { FiPlusSquare } from "react-icons/fi";

type ChypeSelectType = {
    selectedChips: Tags[]
    chips: Tags[]
    onChipClick: (chip: Tags, wasSelected: boolean) => void
}

const ChipSelect = ({ selectedChips, onChipClick, chips }: ChypeSelectType) => {
    const slotsStyles = chipSelectStyle.raw()
    const [filteredTags, setFilteredTags] = useState<Tags[]>(chips)
    const [displayForm, setDisplayForm] = useState(false)

    const onSearchChange = useCallback((tagNameToSearch: string) => {
        const newArray = chips.filter(t => t.tag_name.includes(tagNameToSearch))
        setFilteredTags(newArray)
    }, [])

    const changeFormDisplay = () => {
        setDisplayForm(prev => !prev)
    }

    return (
        <div className={css(slotsStyles.selectContainer)}>
            <SearchTag onChange={onSearchChange} />
            <div className={css(slotsStyles.divider)} />
            <div className={css(slotsStyles.chipContainer)}>
                {filteredTags.map((chip, index) => {
                    const isSelected = selectedChips.some(c => c.id === chip.id)
                    return (
                        <div key={chip.tag_name} onClick={() => onChipClick(chip, isSelected)}>
                            <Chip key={index} value={chip.tag_name} classname={slotsStyles.inputChip} isSelected={isSelected} />
                        </div>
                    )
                })}
                {!displayForm && <FiPlusSquare onClick={changeFormDisplay} />}
            </div>
            <div className={css(slotsStyles.divider)} />
            {displayForm && <AddTagForm />}
        </div>
    )
}

export default ChipSelect