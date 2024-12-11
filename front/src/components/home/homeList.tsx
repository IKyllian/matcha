import Card from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { ListType } from "front/store/homeList"

type HomeListProps = {
  list: ListType
  onLikeClick: (profile_id: number) => void
  onNextPagination: () => void
}

const HomeList = ({ list: { list, reachedEnd }, onLikeClick, onNextPagination }: HomeListProps) => {
  const slotsStyles = homeStyle.raw()

  return (
    <div className={css(slotsStyles.filterListWrapper)}>
      <div className={css(slotsStyles.listContainer)}>
        {
          list.map(l => (
            <Card key={l.user.id} user={l.user} isLike={l.like} onLikeClick={onLikeClick} cardType='image-content' showLike />
          ))
        }
      </div>
      {
        !reachedEnd &&
        <button onClick={onNextPagination} className={css(slotsStyles.paginationButton)}>Afficher plus</button>
      }
    </div>
  )
}

export default HomeList