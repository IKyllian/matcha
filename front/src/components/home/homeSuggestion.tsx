import Card from "front/components/card/card"
import { homeSuggestionStyle } from "./homeSuggestion.style"
import { css } from "styled-system/css"
import { useState } from "react"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useApi } from "front/hook/useApi"
import { ListStateType } from "front/store/homeList"
import { useStore } from "front/store/store"
import { makeLikeRequest } from "front/api/profile"

const HomeSuggestion = () => {
  const slotsStyles = homeSuggestionStyle.raw()
  const [index, setIndex] = useState(0)


  const setSuggestionList = useStore(state => state.setSuggestionList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const { suggestionList } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)


  const onPrev = () => {
    setIndex(prev => prev > 0 ? prev - 1 : prev)
  }

  const onNext = () => {
    setIndex(prev => prev < suggestionList?.length - 1 ? prev + 1 : prev)
  }

  const { isLoading } = useApi<ListStateType[]>({
    endpoint: 'suggestion',
    setter: setSuggestionList,
    key: 'list'
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
        <MdOutlineKeyboardArrowLeft className={css(slotsStyles.arrowIcon)} onClick={onPrev} />
        <Card user={suggestionList[index].user} cardType='image-content' isLike={suggestionList[index].like} className={slotsStyles.cardSuggestion} onLikeClick={onLikeClick} showLike />
        <MdOutlineKeyboardArrowRight className={css(slotsStyles.arrowIcon)} onClick={onNext} />
      </div>
    </div>
  )
}

export default HomeSuggestion