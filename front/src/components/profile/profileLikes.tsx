import { User, USERS } from "front/typing/user"
import CardsList from "../card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"

type ProfileLikesProps = {

}
const ProfileLikes = ({ }: ProfileLikesProps) => {
    const [list, setList] = useState<Partial<User[]>>([])

    const { isLoading } = useApi<Partial<User[]>>({
        endpoint: 'getLikesOfUser',
        setter: setList,
        key: 'likes'
    })

    if (isLoading) {
        return <div> is loading ...</div>
    }
    return (
        <div>
            <CardsList list={list} cardType="image-content" />
        </div>
    )
}


export default ProfileLikes