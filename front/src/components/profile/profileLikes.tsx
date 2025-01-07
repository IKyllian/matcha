import { User } from "front/typing/user"
import { CardsList } from "front/components/card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"
import Loader from "front/components/utils/loader"

type ProfileLikesProps = {

}
const ProfileLikes = ({ }: ProfileLikesProps) => {
    const [list, setList] = useState<Partial<User[]>>([])

    const { isLoading } = useApi<Partial<User[]>>({
        endpoint: 'getUserLikes',
        setter: setList,
        key: 'likes'
    })

    return (
        <Loader isLoading={isLoading} data={list}>
            <div>
                <CardsList list={list} cardType="image-content" />
            </div>
        </Loader>
    )
}


export default ProfileLikes