import { User, USERS } from "front/typing/user"
import CardsList from "../card/cardsList"
import { useState } from "react"
import { useApi } from "front/hook/useApi"


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