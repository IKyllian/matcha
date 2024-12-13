import { User } from "front/typing/user"
import { CardsList } from "front/components/card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"
import Loader from "front/components/utils/loader"

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
    <Loader isLoading={isLoading} data={viewedList}>
      <div>
        <CardsList list={viewedList} cardType='image-content' />
      </div>

    </Loader>
  )
}

export default ProfileViewScreen