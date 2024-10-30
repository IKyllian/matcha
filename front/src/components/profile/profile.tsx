import { css } from "styled-system/css"
import { profileStyle } from "./profile.style"
import { User, USERS } from "front/typing/user"
import Tabs from "front/components/tabs/tabs"
import ChipsList from "front/components/chips/chips"
import { CardType } from "front/components/card/card"
import { useStore } from "front/store/store"
import { useNavigate, useParams } from "react-router-dom"
import IconButton from "front/components/buttons/iconButton"
import { useEffect, useState } from "react"
import { useApi } from "front/hook/useApi"
import { BUTTONS_ICON } from "front/typing/button"
import { makeBlockRequest, makeLikeRequest, makeViewRequest } from "front/api/profile"
import ProfileLikes from "./profileLikes"
import ProfileMatches from "./profileMatches"
import ProfilePictures from "./profilePictures"
import ProfilePicture from "front/components/utils/profilePicture"

const NAV_CONTENT_LOGGED_USER = [
    'Likes',
    'Matches',
    'Photos'
]

const NAV_CONTENT_NOT_LOGGED_USER = [
    'Photos',
]

type ProfileStateType = {
    user: User
    like: boolean
    block: boolean
}

const Profile = () => {
    const { user: loggedUser, token } = useStore((state) => state.authStore)
    const { userId } = useParams<{ userId?: string }>()
    const isLoggedUser = !userId || userId && loggedUser.id === +userId
    const [isReport, setIsReport] = useState(false)
    const [profile, setProfile] = useState<ProfileStateType | undefined>()
    const [navIndex, setNavIndex] = useState(0)
    const handleClick = (index: number) => setNavIndex(index)
    const navigate = useNavigate()
    const { isLoading } = useApi<ProfileStateType>({
        endpoint: 'profile',
        params: { id: userId ? +userId : loggedUser.id },
        setter: setProfile,
        dependencies: [userId],
    })


    const slotsStyles = profileStyle.raw()
    const tabsContent = isLoggedUser ? NAV_CONTENT_LOGGED_USER : NAV_CONTENT_NOT_LOGGED_USER
    const cardType: CardType = isLoggedUser ? 'image-content' : 'image'

    useEffect(() => {
        const request = async () => {
            await makeViewRequest({ token, id: +userId })
        }
        if (+userId !== loggedUser.id) {
            request()
        }
    }, [])


    if (!profile && isLoading) {
        return <span> Is loading ...</span>
    }
    if (!profile && !isLoading) {
        return <span> 404 Not found </span>
    }

    const onLikeClick = async () => {
        const { ok } = await makeLikeRequest({ token, id: profile.user.id })
        if (ok) {
            setProfile(prev => ({ ...prev, like: !profile.like }))
        }
    }

    const onBlockclick = async () => {
        const { ok } = await makeBlockRequest({ token, id: profile.user.id })
        if (ok) {
            setProfile(prev => ({ ...prev, block: !profile.block }))
        }
    }

    const get_tab_content = () => {
        switch (tabsContent[navIndex]) {
            case 'Likes':
                return <ProfileLikes />
            case 'Matches':
                return <ProfileMatches />
            case 'Photos':
                return <ProfilePictures userPictures={profile.user.images} />
        }
    }

    return (
        <div className={css(slotsStyles.profileContainer)}>
            <div className={css(slotsStyles.profilInfosContainer)}>
                <ProfilePicture userImages={profile.user.images} width="300px" height="300px" />
                <div className={css(slotsStyles.profilContent)}>
                    <div className={css(slotsStyles.flexContainer)}>
                        <p> {profile.user.first_name} {profile.user.last_name}, {profile.user.age}ans ({profile.user.username}) </p>
                        <div>
                            {
                                isLoggedUser &&
                                <IconButton buttonIcon={BUTTONS_ICON["SETTINGS"]} onClick={() => navigate('/settings')} />
                            }
                            {
                                !isLoggedUser && (
                                    <div className={css(slotsStyles.profilButtonContainer)}>
                                        <IconButton buttonIcon={BUTTONS_ICON["LIKE"]} status={profile.like} onClick={onLikeClick} />
                                        <IconButton buttonIcon={BUTTONS_ICON["BLOCKED"]} status={profile.block} onClick={onBlockclick} />
                                        <IconButton buttonIcon={BUTTONS_ICON["REPORT"]} status={isReport} onClick={() => setIsReport(prev => !prev)} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <p> {profile.user.location} </p>
                    <p> {profile.user.bio} </p>
                    {
                        profile.user.tags &&
                        <ChipsList chipsList={profile.user.tags} />
                    }
                </div>
            </div>
            <Tabs tabsContent={tabsContent} navIndex={navIndex} handleClick={handleClick} />
            {get_tab_content()}
        </div>
    )
}

export default Profile