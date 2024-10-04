import { css } from "styled-system/css"
import { profileStyle } from "./profile.style"
import { USERS } from "front/typing/user"
import Tabs from "front/components/tabs/tabs"
import CardsList from "front/components/card/cardsList"
import ChipsList from "front/components/chips/chips"
import { CardType } from "front/components/card/card"
import { useStore } from "front/store/socketMidlleware.store"

const USER = USERS[0]
const NAV_CONTENT_LOGGED_USER = [
    'Like',
    'Matches',
    'Views'
]

const NAV_CONTENT_NOT_LOGGED_USER = [
    'Photos',
]

const Profile = () => {
    const authStore = useStore((state) => state.authStore)
    console.info('Profile authStore ', authStore)
    const slotsStyles = profileStyle.raw()
    const isLoggedUser = true
    const tabsContent = isLoggedUser ? NAV_CONTENT_LOGGED_USER : NAV_CONTENT_NOT_LOGGED_USER
    const cardType: CardType = isLoggedUser ? 'image-content' : 'image'
    return (
        <div className={css(slotsStyles.profileContainer)}>
            <div className={css(slotsStyles.profilInfosContainer)}>
                <img className={css(slotsStyles.profileImg)} src={USER.img} />
                <div className={css(slotsStyles.profilContent)}>
                    <p> {USER.firstName} {USER.lastname}, {USER.age}ans ({USER.username}) </p>
                    <p> {USER.location} </p>
                    <p> {USER.description} </p>
                    <ChipsList chipsList={USER.interests} />
                </div>
            </div>
            <Tabs tabsContent={tabsContent} />
            <CardsList list={USERS} cardType={cardType} />
        </div>
    )
}

export default Profile