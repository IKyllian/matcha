import Card from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { ListStateType, OnLikeProps } from "front/store/homeList"

type HomeListProps = {
  list: ListStateType[]
  onLikeClick: (profile_id: number) => void
}

const HomeList = ({ list, onLikeClick }: HomeListProps) => {
  const slotsStyles = homeStyle.raw()

  return (
    <div className={css(slotsStyles.listContainer)}>
      {
        list.map(l => (
          <Card key={l.user.id} user={l.user} isLike={l.like} onLikeClick={onLikeClick} cardType='image-content' />
        ))
      }
    </div>
  )
}

export default HomeList