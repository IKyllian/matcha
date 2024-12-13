import Card from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { ListType } from "front/store/homeList"
import { useStore } from "front/store/store"

type HomeListProps = {
  list: ListType
  onLikeClick: (profile_id: number) => void
  onNextPagination: () => void
}

const HomeList = ({ list: { list, reachedEnd }, onLikeClick, onNextPagination }: HomeListProps) => {
  const slotsStyles = homeStyle.raw()
  const onNextPage = useStore(state => state.onNextPage)
  const onPrevPage = useStore(state => state.onPrevPage)

  return (
    <div className={css(slotsStyles.filterListWrapper)}>
      <div className={css(slotsStyles.listContainer)}>
        {
          list.map(l => (
            <Card key={l.user.id} user={l.user} isLike={l.like} onLikeClick={onLikeClick} cardType='image-content' showLike />
          ))
        }
      </div>
      <div className={css({
        display: 'flex'
      })}>
        <button onClick={onPrevPage} className={css(slotsStyles.paginationButton)}>Precedent</button>
        <button onClick={onNextPage} className={css(slotsStyles.paginationButton)}>Suivant</button>
      </div>
      {/* {
        !reachedEnd &&
        <button onClick={onNextPagination} className={css(slotsStyles.paginationButton)}>Afficher plus</button>
      } */}
    </div>
  )
}

export default HomeList