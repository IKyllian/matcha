import CardsList from "../card/cardsList"


type ProfilePicturesProps = {
    userPictures: any[]
}
const ProfilePictures = ({ userPictures = [] }: ProfilePicturesProps) => {
    return (
        <div>
            <CardsList list={userPictures} cardType="image" />
        </div>
    )
}


export default ProfilePictures