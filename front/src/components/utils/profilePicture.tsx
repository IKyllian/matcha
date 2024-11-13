import { Image } from "front/typing/user"
import { css } from "styled-system/css"
import DefaultProfilePicture from 'front/assets/images/default-profile.jpg'
import { SystemStyleObject } from "styled-system/types"

type ProfilePictureProps = {
    userImages?: Image[]
    width?: string
    height?: string
    className?: SystemStyleObject
}
const ProfilePicture = ({ userImages, width = '100%', height = '100%', className }: ProfilePictureProps) => {
    const imageBase64 = userImages?.find(i => i.is_profile_picture)?.image_file
    const imageSrc = `data:image/png;base64,${imageBase64}`
    return (
        <div className={css({
            width,
            height
        })}>
            <img src={imageBase64 ? imageSrc : DefaultProfilePicture} alt="Image de profile" className={css({
                width: '100%',
                height: '100%'
            }, className)} />
        </div>
    )
}

export default ProfilePicture