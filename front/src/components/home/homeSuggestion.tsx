import Card from "front/components/card/card"
import { USERS } from "front/typing/user"
import { homeSuggestionStyle } from "./homeSuggestion.style"
import { css } from "styled-system/css"
import { useState } from "react"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const LIST = [...USERS]
const HomeSuggestion = () => {
  const slotsStyles = homeSuggestionStyle.raw()
  const [index, setIndex] = useState(0)

  const onPrev = () => {
    setIndex(prev => prev > 0 ? prev - 1 : prev)
  }

  const onNext = () => {
    setIndex(prev => prev < LIST.length - 1 ? prev + 1 : prev)
  }

  return (
    <div className={css(slotsStyles.suggestionContainer)}>
      <div className={css(slotsStyles.suggestionWrapper)}>
        <MdOutlineKeyboardArrowLeft className={css(slotsStyles.arrowIcon)} onClick={onPrev} />
        <Card user={LIST[index]} cardType='image-content' className={slotsStyles.cardSuggestion} />
        <MdOutlineKeyboardArrowRight className={css(slotsStyles.arrowIcon)} onClick={onNext} />
      </div>
    </div>
  )
}

export default HomeSuggestion