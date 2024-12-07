import { cardStyle } from './card.style'
import { css, Styles } from 'styled-system/css';
import { FaLocationDot } from "react-icons/fa6";
import { User } from 'front/typing/user';
import { Link } from 'react-router-dom';
import IconButton from 'front/components/buttons/iconButton';
import { BUTTONS_ICON } from 'front/typing/button';
import ProfilePicture from 'front/components/utils/profilePicture';
import { TbGenderFemale } from "react-icons/tb";
import { PiGenderMale } from "react-icons/pi";
import StarRating from '../profile/StarRating';

export type CardType = 'image' | 'image-content'

type CardProps = {
    user: User
    cardType: CardType
    className?: Styles
    isLike?: boolean,
    onLikeClick?: (profile_id: number) => void
    showLike?: boolean
}
const Card = ({ user, cardType, className, isLike, onLikeClick, showLike = false }: CardProps) => {
    const { location, last_name, first_name } = user
    const slotsStyles = cardStyle.raw()

    const diplayGender = () => {
        const gender = user.gender
        if (!user.gender) return null
        if (gender === 'F') {
            return (
                <TbGenderFemale color='pink' className={css(slotsStyles.gender)} />
            )
        } else {
            return (
                <PiGenderMale color='blue' className={css(slotsStyles.gender)} />
            )
        }
    }
    return (
        <div className={css(slotsStyles.cardWrapper, className, {
            // height: cardType === 'image-content' ? '370px' : 'auto'
        })}>
            <ProfilePicture className={slotsStyles.cardImg} userImages={user.images} width='280px' height='280px' />
            {
                cardType === 'image-content' && (
                    <div className={css(slotsStyles.cardContent)}>
                        <div className={css(slotsStyles.textWrapper)}>
                            <div className={css(slotsStyles.nameWrapper)}>
                                {diplayGender()}
                                <Link to={`/profile/${user.id}`} className={css(slotsStyles.cardPrimaryText)}> {first_name} {last_name} </Link>
                            </div>
                            <div className={css({
                                display: 'flex',
                                gap: '8px',
                                alignItems: ' center',
                            })}>
                                {user.distance >= 0 && <p className={css(slotsStyles.cardSecondaryText)}> <FaLocationDot /> {Math.round(user.distance)}km </p>}
                                {user.fame_rating && <StarRating isReadOnly initialRating={user.fame_rating} unit="float" size={15} />}
                            </div>
                            {/* {user.fame_rating && <StarRating isReadOnly initialRating={user.fame_rating} unit="float" size={15} />}
                            {user.distance && <p className={css(slotsStyles.cardSecondaryText)}> <FaLocationDot /> {Math.round(user.distance)}km </p>} */}
                        </div>
                        {showLike && <IconButton className={slotsStyles.likeButton} buttonIcon={BUTTONS_ICON["LIKE"]} status={isLike} onClick={() => onLikeClick(user.id)} />}
                    </div>
                )
            }
        </div>
    )
}

export default Card