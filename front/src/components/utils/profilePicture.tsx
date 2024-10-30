import { Image } from "front/typing/user"
import { css } from "styled-system/css"

type ProfilePictureProps = {
    userImages?: Image[]
    width?: string
    height?: string
}
const ProfilePicture = ({ userImages, width = 'fit-content', height = 'fit-content' }: ProfilePictureProps) => {
    const imageBase64 = userImages?.find(i => i.is_profile_picture)?.image_file
    const imageSrc = `data:image/jpeg;base64,${imageBase64}`
    return (
        <div className={css({
            width,
            height
        })}>
            <img src={imageSrc} alt="Image de profile" className={css({
                width: '100%',
                height: '100%'
            })} />
        </div>
    )
}

export default ProfilePicture