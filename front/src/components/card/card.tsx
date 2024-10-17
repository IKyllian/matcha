import { cardStyle } from './card.style'
import { css, Styles } from 'styled-system/css';
import { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { User } from 'front/typing/user';
import { Link } from 'react-router-dom';
import IconButton from 'front/components/buttons/iconButton';
import { BUTTONS_ICON } from 'front/typing/button';

export type CardType = 'image' | 'image-content'

type CardProps = {
    user: User
    cardType: CardType
    className?: Styles
}
const Card = ({ user, cardType, className }: CardProps) => {
    const { location, username } = user
    const [isLike, setIsLike] = useState(false)
    const slotsStyles = cardStyle.raw()
    return (
        <div className={css(slotsStyles.cardWrapper, className, {
            height: cardType === 'image-content' ? '370px' : 'auto'
        })}>
            <img src={user.img} className={css(slotsStyles.cardImg)} />
            {
                cardType === 'image-content' && (
                    <div className={css(slotsStyles.cardContent)}>
                        <div className={css(slotsStyles.textWrapper)}>
                            <Link to={`/profile/${user.id}`} className={css(slotsStyles.cardPrimaryText)}> {username} </Link>
                            <p className={css(slotsStyles.cardSecondaryText)}> <FaLocationDot /> {location} </p>
                        </div>
                        <IconButton buttonIcon={BUTTONS_ICON["LIKE"]} status={isLike} onClick={() => setIsLike(prev => !prev)} />
                    </div>
                )
            }
        </div>
    )
}

export default Card