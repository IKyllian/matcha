import { Image } from "front/typing/user"
import { css } from "styled-system/css"
import DefaultProfilePicture from 'front/assets/images/default-profile.jpg'
import { SystemStyleObject } from "styled-system/types"

type ProfilePictureProps = {
    userImages?: Image[]
    width?: string
    height?: string
    className?: SystemStyleObject
    onClick?: () => void
}
const ProfilePicture = ({ userImages, width = '100%', height = '100%', className, onClick }: ProfilePictureProps) => {
    const imageBase64 = userImages?.find(i => i.is_profile_picture)?.image_file
    return (
        <div
            className={css({
                width,
                height
            })}
            onClick={onClick ? onClick : undefined}
        >
            <img src={imageBase64 ? imageBase64 : DefaultProfilePicture} alt="Image de profile" className={css({
                width: '100%',
                height: '100%'
            }, className)} />
        </div>
    )
}

export default ProfilePicture