import { User } from "front/typing/user"
import { CardsList } from "front/components/card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"
import Loader from "front/components/utils/loader"

type ProfileMatchesProps = {

}
const ProfileMatches = ({ }: ProfileMatchesProps) => {
    const [list, setList] = useState<Partial<User[]>>([])

    const { isLoading } = useApi<Partial<User[]>>({
        endpoint: 'getMatchesOfUser',
        setter: setList,
        key: 'matches'
    })

    return (
        <Loader isLoading={isLoading} data={list}>
            <div>
                <CardsList list={list} cardType="image-content" />
            </div>
        </Loader>
    )
}


export default ProfileMatches