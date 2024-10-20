import { css } from "styled-system/css"
import { profileStyle } from "./profile.style"
import { User, USERS } from "front/typing/user"
import Tabs from "front/components/tabs/tabs"
import CardsList from "front/components/card/cardsList"
import ChipsList from "front/components/chips/chips"
import { CardType } from "front/components/card/card"
import { useStore } from "front/store/store"
import { useParams } from "react-router-dom"
import IconButton from "front/components/buttons/iconButton"
import { useState } from "react"
import { useApi } from "front/hook/useApi"
import { BUTTONS_ICON } from "front/typing/button"

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
    const { userId } = useParams<{ userId?: string }>()
    const isLoggedUser = !userId || userId && authStore.user?.id === +userId
    const [isLike, setIsLike] = useState(false)
    const [isBlock, setIsBlock] = useState(false)
    const [isReport, setIsReport] = useState(false)
    const [user, setUser] = useState<User | undefined>()
    const [navIndex, setNavIndex] = useState(0)
    const handleClick = (index: number) => setNavIndex(index)
    const { isLoading } = useApi<User>({
        endpoint: 'profile',
        params: { id: userId ? +userId : authStore.user?.id },
        setter: setUser,
        dependencies: [userId]
    })
    const slotsStyles = profileStyle.raw()
    const tabsContent = isLoggedUser ? NAV_CONTENT_LOGGED_USER : NAV_CONTENT_NOT_LOGGED_USER
    const cardType: CardType = isLoggedUser ? 'image-content' : 'image'

    if (!user && isLoading) {
        return <span> Is loading ...</span>
    }
    if (!user && !isLoading) {
        return <span> 404 Not found </span>
    }
    return (
        <div className={css(slotsStyles.profileContainer)}>
            <div className={css(slotsStyles.profilInfosContainer)}>
                <img className={css(slotsStyles.profileImg)} src={user.img} />
                <div className={css(slotsStyles.profilContent)}>
                    <div className={css(slotsStyles.flexContainer)}>
                        <p> {user.firstname} {user.lastname}, {user.age}ans ({user.username}) </p>
                        {
                            isLoggedUser &&
                            <IconButton buttonIcon={BUTTONS_ICON["SETTINGS"]} />
                        }
                        {
                            !isLoggedUser && (
                                <div className={css(slotsStyles.profilButtonContainer)}>
                                    <IconButton buttonIcon={BUTTONS_ICON["LIKE"]} status={isLike} onClick={() => setIsLike(prev => !prev)} />
                                    <IconButton buttonIcon={BUTTONS_ICON["BLOCKED"]} status={isBlock} onClick={() => setIsBlock(prev => !prev)} />
                                    <IconButton buttonIcon={BUTTONS_ICON["REPORT"]} status={isReport} onClick={() => setIsReport(prev => !prev)} />
                                </div>
                            )
                        }
                    </div>
                    <p> {user.location} </p>
                    <p> {user.description} </p>
                    <ChipsList chipsList={user.tags} />
                </div>
            </div>
            <Tabs tabsContent={tabsContent} navIndex={navIndex} handleClick={handleClick} />
            <CardsList list={USERS} cardType={cardType} />
        </div>
    )
}

export default Profile