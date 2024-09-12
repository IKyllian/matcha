import { css } from "styled-system/css"
import { buttonStyle } from "./button.style"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

type LikeButton = {
    isLike: boolean;
    onClick: () => void;
}
const LikeButton = ({ isLike, onClick }: LikeButton) => {
    const slotsStyles = buttonStyle.raw()
    return (
        <div
            onClick={onClick}
            className={
                css(
                    slotsStyles.likeButtonContainer,
                    {
                        backgroundColor: isLike ? 'lightPink' : 'secondaryBackground',
                    }
                )
            }
        >
            {
                isLike
                    ? <FaHeart className={css(slotsStyles.likeIcon)} />
                    : <FaRegHeart className={css(slotsStyles.likeIcon)} />
            }
        </div>
    )
}

export default LikeButton