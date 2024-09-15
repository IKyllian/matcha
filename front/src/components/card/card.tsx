import { cardStyle } from './card.style'
import { css } from 'styled-system/css';
import LikeButton from 'front/components/buttons/likeButton';
import { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { User } from 'front/typing/user';

export type CardType = 'image' | 'image-content'

type CardProps = {
    user: User
    cardType: CardType
}
const Card = ({ user, cardType }: CardProps) => {
    const { location, username } = user
    const [isLike, setIsLike] = useState(false)
    const slotsStyles = cardStyle.raw()
    return (
        <div className={css(slotsStyles.cardWrapper, {
            height: cardType === 'image-content' ? '370px' : 'auto'
        })}>
            <img src={user.img} className={css(slotsStyles.cardImg)} />
            {
                cardType === 'image-content' && (
                    <div className={css(slotsStyles.cardContent)}>
                        <div className={css(slotsStyles.textWrapper)}>
                            <p className={css(slotsStyles.cardPrimaryText)}> {username} </p>
                            <p className={css(slotsStyles.cardSecondaryText)}> <FaLocationDot /> {location} </p>
                        </div>
                        <LikeButton isLike={isLike} onClick={() => setIsLike(prev => !prev)} />
                    </div>
                )
            }
        </div>
    )
}

export default Card