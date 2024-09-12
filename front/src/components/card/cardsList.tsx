import { User } from "front/typing/user"
import Card from "front/components/card/card"
import { css } from "styled-system/css"
import { cardStyle } from "./card.style"

type CardsProps = {
    list: User[]
}

const CardsList = ({ list }: CardsProps) => {
    const slotsStyles = cardStyle.raw()
    return (
        <div className={css(slotsStyles.cardsContainer)}>
            {
                list.map((user) => (
                    <Card key={user.id} user={user} />
                ))
            }
        </div>
    )
}

export default CardsList