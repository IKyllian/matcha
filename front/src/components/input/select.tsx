import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { useState } from "react";
import { selectInputStyle } from "./select.style";
import { css } from "styled-system/css";
import useCloseRef from "front/hook/useCloseRef";
import { SORT_ENUM } from "front/typing/filters";

const SELECT_LIST = [
    {
        id: SORT_ENUM.DISTANCE_ASC,
        value: 'Distance',
        icon: FaSortAmountDownAlt
    },
    {
        id: SORT_ENUM.DISTANCE_DESC,
        value: 'Distance',
        icon: FaSortAmountDown
    },
    {
        id: SORT_ENUM.AGE_ASC,
        value: 'Age',
        icon: FaSortAmountDownAlt
    },
    {
        id: SORT_ENUM.AGE_DESC,
        value: 'Age',
        icon: FaSortAmountDown
    },
    {
        id: SORT_ENUM.FAME_ASC,
        value: 'Fame Rating',
        icon: FaSortAmountDownAlt
    },
    {
        id: SORT_ENUM.FAME_DESC,
        value: 'Fame Rating',
        icon: FaSortAmountDown
    },
]

type SelectProps = {
    onChange: (value: number) => void
    defaultValue: SORT_ENUM
}
const Select = ({ onChange, defaultValue }: SelectProps) => {
    const slotsStyles = selectInputStyle.raw()
    const [showList, setShowList] = useState(false)
    const [selectedItem, setSelectedItem] = useState(SELECT_LIST.find(e => e.id === defaultValue) || SELECT_LIST[0])

    const onClose = () => setShowList(false)
    const closeRef = useCloseRef({ onClose })

    const onSelectedClick = () => {
        setShowList(prev => !prev)
    }

    const handleItemclick = (id: number, index: number) => {
        onClose()
        onChange(id)
        setSelectedItem(SELECT_LIST[index])
    }

    return (
        <div className={css(slotsStyles.inputSelectWrapper)}>
            <div className={css(slotsStyles.selectedItemContainer)} onClick={onSelectedClick}>
                <span>
                    {<selectedItem.icon />} <span style={{ flex: '1' }}>{selectedItem.value}</span> {<MdKeyboardArrowDown />}
                </span>
            </div>
            {
                showList && (
                    <div className={css(slotsStyles.selectListContainer)} ref={closeRef}>
                        {
                            SELECT_LIST.map((item, index) => (
                                <div key={item.id} onClick={() => handleItemclick(item.id, index)}>
                                    <span className={css(slotsStyles.itemContainer)}>
                                        {<item.icon />} {item.value}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Select