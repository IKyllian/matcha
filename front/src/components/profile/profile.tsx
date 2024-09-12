import { css } from "styled-system/css"
import { profileStyle } from "./profile.style"
import { USERS } from "front/typing/user"
import Tabs from "front/components/tabs/tabs"
import CardsList from "front/components/card/cardsList"
import ChipsList from "front/components/chips/chips"

const USER = USERS[0]
const Profile = () => {
    const slotsStyles = profileStyle.raw()
    return (
        <div className={css(slotsStyles.profileContainer)}>
            <div className={css(slotsStyles.profilInfosContainer)}>
                <img className={css(slotsStyles.profileImg)} src={USER.img} />
                <div className={css(slotsStyles.profilContent)}>
                    <p> {USER.firstName} {USER.lastname} ({USER.username}) </p>
                    <p> {USER.description} </p>
                    <ChipsList chipsList={USER.interests} />
                </div>
            </div>
            <Tabs />
            <CardsList list={USERS} />
        </div>
    )
}

export default Profile