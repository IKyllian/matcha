import { User, USERS } from "front/typing/user"
import CardsList from "../card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"

type ProfileMatchesProps = {

}
const ProfileMatches = ({ }: ProfileMatchesProps) => {
    const [list, setList] = useState<Partial<User[]>>([])

    const { isLoading } = useApi<Partial<User[]>>({
        endpoint: 'getMatchesOfUser',
        setter: setList,
        key: 'matches'
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


export default ProfileMatches