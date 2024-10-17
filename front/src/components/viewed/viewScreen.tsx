import { USERS } from "front/typing/user"
import Card from "../card/card"
import CardsList from "../card/cardsList"
import { viewScreenStyle } from "./viewScreen.style"
import { css } from "styled-system/css"

const ViewScreen = () => {
  const slotsStyles = viewScreenStyle.raw()
  return (
    <div>
      <h1 className={css(slotsStyles.title)}> Vues </h1>
      <div>
        <CardsList list={USERS} cardType='image-content' />
      </div>
    </div>
  )
}

export default ViewScreen