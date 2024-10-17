import Card from "front/components/card/card"
import { USERS } from "front/typing/user"
import { homeSuggestionStyle } from "./homeSuggestion.style"
import { css } from "styled-system/css"

const LIST = [...USERS]
const HomeSuggestion = () => {
  const slotsStyles = homeSuggestionStyle.raw()
  return (
    <div className={css(slotsStyles.suggestionContainer)}>
      <Card user={LIST[0]} cardType='image-content' className={slotsStyles.cardSuggestion} />
    </div>
  )
}

export default HomeSuggestion