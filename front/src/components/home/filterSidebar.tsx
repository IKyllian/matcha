import { css } from "styled-system/css"
import { filterSidebarStyle } from "./filterSidebar.style"
import { useState } from "react"
import useCloseRef from "front/hook/useCloseRef"
import ChipSelect from "front/components/chips/chipSelect"
import { IoMdClose } from "react-icons/io";
import MultiRangeInput from "front/components/input/multiRange"

type FilterSidebarProps = {
  onClose: () => void
}

const FilterSidebar = ({ onClose }: FilterSidebarProps) => {
  const slotsStyles = filterSidebarStyle.raw()
  const ref = useCloseRef({ onClose })
  const [selectedChips, setSelectedChips] = useState<string[]>([])

  const onChipClick = (chip: string, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChips(prev => [...prev.filter(c => c !== chip)])
    } else {
      setSelectedChips(prev => [...prev, chip])
    }
  }

  return (
    <div className={css(slotsStyles.sidebarContainer)} ref={ref}>
      <IoMdClose className={css(slotsStyles.closeButton)} onClick={onClose} />
      <span className={css(slotsStyles.title)}> Filtrage des profils </span>
      <div className={css(slotsStyles.filtersContainer)} >
        <label>
          Age
          <MultiRangeInput min={0} max={100} />
          <input type='range' />
        </label>
        <label>
          Position
          <input type='range' />
        </label>
        <label>
          Fame
          <input type='range' />
        </label>
        <label>
          Centre d'interets
          <ChipSelect selectedChips={selectedChips} onChipClick={onChipClick} />
        </label>
        <button className={css(slotsStyles.button)}> Sauvegarder </button>
      </div>
    </div>
  )
}

export default FilterSidebar