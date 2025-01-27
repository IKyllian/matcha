import { useRef, useState } from "react"
import { multiRangeInputStyle } from "./multiRange.style"
import { css } from "styled-system/css"
import { UseFormSetValue } from "react-hook-form"

type FormValues = {
  min_age?: number;
  max_age?: number;
  max_pos?: number;
  min_fame?: number;
}
type MultiRangeInputProps = {
  min: number
  max: number
  setValue: UseFormSetValue<FormValues>
  defaultMin: number
  defaultMax: number
}
const MultiRangeInput = ({ min, max, defaultMin, defaultMax, setValue }: MultiRangeInputProps) => {
  const slotsStyles = multiRangeInputStyle.raw()
  const [minVal, setMinVal] = useState(defaultMin)
  const [maxVal, setMaxVal] = useState(defaultMax)

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
          setValue('min_age', value)
          event.target.value = value.toString();
        }}
        className={css(slotsStyles.input)}
        style={{
          '--input-z-index': minVal > (max - 100) ? '5' : '3'
        } as React.CSSProperties}
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
          setValue('max_age', value)
          event.target.value = value.toString();
        }}
        className={css(slotsStyles.input)}
        style={{
          '--input-z-index': '4'
        } as React.CSSProperties}
      />

      <div className={css(slotsStyles.slider)}>
        <div className={css(slotsStyles.sliderTrack)} />
        <div ref={range} className={css(slotsStyles.sliderRange)} />
        <div className={css(slotsStyles.sliderValue, slotsStyles.valueLeft)}>{minVal}</div>
        <div className={css(slotsStyles.sliderValue, slotsStyles.valueRight)}>{maxVal}</div>
      </div>
    </div>
  )
}

export default MultiRangeInput