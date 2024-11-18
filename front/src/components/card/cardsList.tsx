import { Image, User } from "front/typing/user"
import Card, { CardType } from "front/components/card/card"
import { css } from "styled-system/css"
import { cardStyle } from "./card.style"

type CardsProps = {
    list: User[]
    cardType: CardType
}

export const CardsList = ({ list, cardType }: CardsProps) => {
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

type CardsImagesList = {
    list: Image[]
}

export const CardsImagesList = ({ list }: CardsImagesList) => {
    const slotsStyles = cardStyle.raw()
    return (
        <div className={css(slotsStyles.cardsContainer)}>
            {
                list.map(image => {
                    const imageSrc = `data:image/jpeg;base64,${image.image_file}`
                    return (
                        <div key={imageSrc} className={css(slotsStyles.cardWrapper, {
                            height: 'auto'
                        })}>
                            <img src={imageSrc} className={css({
                                width: '280px',
                                height: '280px'
                            })} alt="Photo de profile" />
                        </div>
                    )
                })
            }
        </div>
    )
}