import { useApi } from "front/hook/useApi"
import { User } from "front/typing/user"
import { useState } from "react"
import { CardsList } from "front/components/card/cardsList"
import Loader from "front/components/utils/loader"

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
        <Loader isLoading={isLoading} data={viewedList}>
            <div>
                <CardsList list={viewedList} cardType='image-content' />
            </div>
        </Loader>
    )
}

export default ProfileBlocks