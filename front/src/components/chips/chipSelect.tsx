import { chipSelectStyle } from "./chipSelect.style"
import { css } from "styled-system/css"
import Chip from "./chip"
import { Tags } from "front/typing/user"
import AddTagForm from "front/components/chips/addTagForm"
import SearchTag from "front/components/chips/searchTag"
import { useCallback, useState } from "react"
import { FaPlus } from "react-icons/fa6";

type ChypeSelectType = {
    selectedChips: Tags[]
    chips: Tags[]
    onChipClick: (chip: Tags, wasSelected: boolean) => void
}

const ChipSelect = ({ selectedChips, onChipClick, chips }: ChypeSelectType) => {
    const slotsStyles = chipSelectStyle.raw()
    const [allTags, setAllTags] = useState<Tags[]>(chips)
    const [filteredTags, setFilteredTags] = useState<Tags[]>(chips)
    const [displayForm, setDisplayForm] = useState(false)
    const [currentSearch, setCurrentSearch] = useState<string>("")

    const onSearchChange = useCallback((tagNameToSearch: string) => {
        setCurrentSearch(tagNameToSearch)
        const newArray = allTags.filter(t => t.tag_name.includes(tagNameToSearch.toLocaleLowerCase()))
        setFilteredTags(newArray)
    }, [allTags])

    const changeFormDisplay = useCallback(() => {
        setDisplayForm(prev => !prev)
    }, [])

    const onTagCreated = useCallback((tag: Tags) => {
        setAllTags(prev => [...prev, tag])
        if (tag.tag_name.includes(currentSearch)) {
            setFilteredTags(prev => [...prev, tag])
        }
    }, [currentSearch])

    return (
        <div className={css(slotsStyles.selectContainer)}>
            <SearchTag onChange={onSearchChange} />
            <div className={css(slotsStyles.chipContainer)}>
                {filteredTags.map((chip, index) => {
                    const isSelected = selectedChips.some(c => c.id === chip.id)
                    return (
                        <div key={chip.tag_name} onClick={() => onChipClick(chip, isSelected)}>
                            <Chip key={index} value={chip.tag_name} classname={slotsStyles.inputChip} isSelected={isSelected} />
                        </div>
                    )
                })}
                {!displayForm &&
                    <div onClick={changeFormDisplay} className={css(slotsStyles.openFormButtonContainer)}>
                        <FaPlus />
                    </div>
                }
            </div>
            {displayForm &&
                <AddTagForm onSubmit={onTagCreated} onCancel={changeFormDisplay} />
            }
        </div>
    )
}

export default ChipSelect