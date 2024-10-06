import { css } from "styled-system/css"
import { filterSidebarStyle } from "./filterSidebar.style"
import { useRef } from "react"
import useCloseRef from "front/hook/useCloseRef"


type FilterSidebarProps = {
  onClose: () => void
}
const FilterSidebar = ({ onClose }: FilterSidebarProps) => {
  const slotsStyles = filterSidebarStyle.raw()
  const ref = useCloseRef({ onClose })

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
        <button className={css(slotsStyles.button)}> Sauvegarder </button>
      </div>
    </div>
  )
}

export default FilterSidebar