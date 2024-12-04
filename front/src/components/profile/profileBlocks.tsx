import { useApi } from "front/hook/useApi"
import { User } from "front/typing/user"
import { useState } from "react"
import { CardsList } from "front/components/card/cardsList"

const ProfileBlocks = () => {
    const [viewedList, setViewList] = useState<Partial<User[]>>([])
    const { isLoading } = useApi<Partial<User[]>>({
        endpoint: 'getBlocksOfUser',
        setter: setViewList,
        key: 'blocks',
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

export default ProfileBlocks