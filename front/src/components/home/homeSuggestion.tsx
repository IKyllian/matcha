import Card from "front/components/card/card"
import { homeSuggestionStyle } from "./homeSuggestion.style"
import { css } from "styled-system/css"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useApi } from "front/hook/useApi"
import { ListType } from "front/store/homeList"
import { useStore } from "front/store/store"
import { makeLikeRequest } from "front/api/profile"

const HomeSuggestion = () => {
  const slotsStyles = homeSuggestionStyle.raw()
  const setSuggestionList = useStore(state => state.setSuggestionList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const onSuggestionNext = useStore(state => state.onSuggestionNext)
  const onSuggestionPrev = useStore(state => state.onSuggestionPrev)
  const { suggestionIndex } = useStore(state => state.homeState)
  const { suggestionList: { list: suggestionList, reachedEnd } } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)
  const suggestionNextOffeset = useStore(state => state.suggestionNextOffeset)
  const { suggestionOffset } = useStore(state => state.homeState)

  const onNext = () => {
    if (suggestionIndex < suggestionList?.length - 1) {
      onSuggestionNext()
    } else if (!reachedEnd) {
      suggestionNextOffeset()
    }
  }

  const { isLoading } = useApi<ListType>({
    endpoint: 'suggestion',
    setter: setSuggestionList,
    dependencies: [suggestionOffset]
  })

  const onLikeClick = async (profile_id: number) => {
    const ret = await makeLikeRequest({ token, id: profile_id, addAlert })
    if (ret) {
      updateProfileListLike({ listKey: 'suggestionList', profile_id })
    }
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  if (!isLoading && (!suggestionList || suggestionList.length === 0)) {
    return <p>No profile...</p>
  }

  return (
    <div className={css(slotsStyles.suggestionContainer)}>
      <div className={css(slotsStyles.suggestionWrapper)}>
        <MdOutlineKeyboardArrowLeft className={css(slotsStyles.arrowIcon)} onClick={onSuggestionPrev} />
        <Card user={suggestionList[suggestionIndex].user} cardType='image-content' isLike={suggestionList[suggestionIndex].like} className={slotsStyles.cardSuggestion} onLikeClick={onLikeClick} showLike />
        {!reachedEnd && <MdOutlineKeyboardArrowRight className={css(slotsStyles.arrowIcon)} onClick={onNext} />}
      </div>
    </div>
  )
}

export default HomeSuggestion