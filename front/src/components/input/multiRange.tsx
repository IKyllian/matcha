import { useRef, useState } from "react"
import { multiRangeInputStyle } from "./multiRange.style"
import { css } from "styled-system/css"

type MultiRangeInputProps = {
  min: number,
  max: number,
}
const MultiRangeInput = ({ min, max }: MultiRangeInputProps) => {
  const slotsStyles = multiRangeInputStyle.raw()
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)

  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  return (
    <div className={css(slotsStyles.rangeContainer)}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={css(slotsStyles.input)}
        style={{
          '--input-z-index': minVal > (max - 100) ? '5' : '3'
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className={css(slotsStyles.input)}
        style={{
          '--input-z-index': '4'
        }}
      />


      <div className={css(slotsStyles.slider)}>
        <div className={css(slotsStyles.sliderTrack)} />
        <div className={css(slotsStyles.sliderRange)} />
      </div>
      <div ref={range} className={css(slotsStyles.sliderRange)} />
    </div>
  )
}

export default MultiRangeInput