import { USERS } from "front/typing/user"
import Card, { CardType } from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"

const LIST = [...USERS]

const HomeList = () => {
  const slotsStyles = homeStyle.raw()
  return (
    <div className={css(slotsStyles.listContainer)}>
      {
        LIST.map(user => (
          <Card key={user.id} user={user} cardType='image-content' />
        ))
      }
    </div>
  )
}

export default HomeList