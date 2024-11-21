import { User, USERS } from "front/typing/user"
import { CardsList } from "../card/cardsList"
import { viewScreenStyle } from "./viewScreen.style"
import { css } from "styled-system/css"
import { useState } from "react"
import { useApi } from "front/hook/useApi"

const ViewScreen = () => {
  const slotsStyles = viewScreenStyle.raw()
  const [viewedList, setViewList] = useState<Partial<User[]>>([])
  const { isLoading } = useApi<Partial<User[]>>({
    endpoint: 'getUserViews',
    setter: setViewList,
    key: 'views',
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className={css(slotsStyles.title)}> Vues </h1>
      <div>
        <CardsList list={viewedList} cardType='image-content' />
      </div>
    </div>
  )
}

export default ViewScreen