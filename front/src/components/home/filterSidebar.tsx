import { css } from "styled-system/css"
import { filterSidebarStyle } from "./filterSidebar.style"
import { useRef, useState } from "react"
import useCloseRef from "front/hook/useCloseRef"
import ChipSelect from "front/components/chips/chipSelect"

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
      <span className={css(slotsStyles.title)}> Filtrage des profils </span>
      <div className={css(slotsStyles.filtersContainer)} >
        <label>
          Age
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
        <ChipSelect selectedChips={selectedChips} onChipClick={onChipClick} />
        <button className={css(slotsStyles.button)}> Sauvegarder </button>
      </div>
    </div>
  )
}

export default FilterSidebar