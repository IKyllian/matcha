import { User } from "front/typing/user"
import Card, { CardType } from "front/components/card/card"
import { css } from "styled-system/css"
import { cardStyle } from "./card.style"

type CardsProps = {
    list: User[]
    cardType: CardType
}

const CardsList = ({ list, cardType }: CardsProps) => {
    const slotsStyles = cardStyle.raw()
    return (
        <div className={css(slotsStyles.cardsContainer)}>
            {
                list.map((user) => (
                    <Card key={user.id} user={user} cardType={cardType} />
                ))
            }
        </div>
    )
}

export default CardsList