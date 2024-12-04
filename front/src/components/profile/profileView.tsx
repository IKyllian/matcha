import { User } from "front/typing/user"
import { CardsList } from "front/components/card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"

const ProfileViewScreen = () => {
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
      <CardsList list={viewedList} cardType='image-content' />
    </div>
  )
}

export default ProfileViewScreen