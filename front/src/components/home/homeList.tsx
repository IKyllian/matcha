import Card from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { ListType } from "front/store/homeList"
import { useSearchParams } from "react-router-dom"

type HomeListProps = {
  list: ListType
  onLikeClick: (profile_id: number) => void
  onNextPagination: () => void
  onPrevPagination: () => void
}

const HomeList = ({ list: { list, reachedEnd }, onLikeClick, onNextPagination, onPrevPagination }: HomeListProps) => {
  const slotsStyles = homeStyle.raw()
  let [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page'))

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
        {page > 0 && <button onClick={onPrevPagination} className={css(slotsStyles.paginationButton)}>Precedent</button>}
        {!reachedEnd && <button onClick={onNextPagination} className={css(slotsStyles.paginationButton)}>Suivant</button>}
      </div>
    </div>
  )
}

export default HomeList