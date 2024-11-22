import { css } from "styled-system/css"
import { profileStyle } from "./profile.style"
import { User } from "front/typing/user"
import Tabs from "front/components/tabs/tabs"
import ChipsList from "front/components/chips/chips"
import { useStore } from "front/store/store"
import { useNavigate, useParams } from "react-router-dom"
import IconButton from "front/components/buttons/iconButton"
import { useEffect, useState } from "react"
import { useApi } from "front/hook/useApi"
import { BUTTONS_ICON } from "front/typing/button"
import { makeBlockRequest, makeLikeRequest, makeViewRequest } from "front/api/profile"
import ProfileLikes from "./profileLikes"
import ProfileMatches from "./profileMatches"
import ProfilePicture from "front/components/utils/profilePicture"
import { CardsImagesList } from "front/components/card/cardsList"
import StarRating from './StarRating'

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
    const addAlert = useStore((state) => state.addAlert)
    const openModal = useStore((state) => state.openModal)
    const { userId } = useParams<{ userId?: string }>()
    const isLoggedUser = !userId || userId && loggedUser.id === +userId
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

    useEffect(() => {
        const request = async () => {
            await makeViewRequest({ token, id: +userId })
        }
        if (!isLoggedUser) {
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
        const ret = await makeLikeRequest({ token, id: profile.user.id, addAlert })
        if (ret) {
            setProfile(prev => ({ ...prev, like: !profile.like }))
        }
    }

    const onBlockclick = async () => {
        const ret = await makeBlockRequest({ token, id: profile.user.id, addAlert })
        if (ret) {
            setProfile(prev => ({ ...prev, block: !profile.block }))
        }
    }

    const onReportClick = () => {
        openModal({ modalKey: 'report', userToReportId: +userId })
    }

    const get_tab_content = () => {
        switch (tabsContent[navIndex]) {
            case 'Likes':
                return <ProfileLikes />
            case 'Matches':
                return <ProfileMatches />
            case 'Photos':
                return <CardsImagesList list={profile.user.images} />
        }
    }

    return (
        <div className={css(slotsStyles.profileContainer)}>
            <div className={css(slotsStyles.profilInfosContainer)}>
                <ProfilePicture className={slotsStyles.profileImg} userImages={profile.user.images} width="300px" height="300px" />
                <div className={css(slotsStyles.profilContent)}>
                    <div className={css(slotsStyles.flexContainer)}>
                        <div className={css(slotsStyles.userInfoContainer)}>
                            <p><span className={css(slotsStyles.profileName)}>{profile.user.first_name} {profile.user.last_name}</span> {profile.user.age} ans</p>
                            <StarRating containerClassName='starClass' isReadOnly initialRating={profile.user.fame_rating} unit="float" />
                        </div>
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
                                        <IconButton buttonIcon={BUTTONS_ICON["REPORT"]} onClick={onReportClick} />
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