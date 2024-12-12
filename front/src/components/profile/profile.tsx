import { css } from "styled-system/css"
import { profileStyle } from "./profile.style"
import Tabs from "front/components/tabs/tabs"
import ChipsList from "front/components/chips/chips"
import { useStore } from "front/store/store"
import { useNavigate, useParams } from "react-router-dom"
import IconButton from "front/components/buttons/iconButton"
import { useCallback, useEffect, useState } from "react"
import { useApi } from "front/hook/useApi"
import { BUTTONS_ICON } from "front/typing/button"
import { makeBlockRequest, makeLikeRequest, makeViewRequest } from "front/api/profile"
import ProfileLikes from "./profileLikes"
import ProfileMatches from "./profileMatches"
import ProfilePicture from "front/components/utils/profilePicture"
import { CardsImagesList } from "front/components/card/cardsList"
import StarRating from './StarRating'
import ProfileViewScreen from "./profileView"
import ProfileBlocks from "./profileBlocks"
import { getMessageDateString } from "front/utils/chat"
import { ProfileStateType } from "front/store/profile.store"
import _ from 'lodash'
import Screen404 from "front/components/utils/404"

type NAV_CONTENT_TYPE =
    'Likes' |
    'Matches' |
    'Vues' |
    'Blocks' |
    'Photos'

const NAV_CONTENT_LOGGED_USER: NAV_CONTENT_TYPE[] = [
    'Likes',
    'Matches',
    'Vues',
    'Blocks',
    'Photos'
]

const NAV_CONTENT_NOT_LOGGED_USER: NAV_CONTENT_TYPE[] = [
    'Photos',
]

type ProfileProps = {
    profile: ProfileStateType,
    isLoggedUser: boolean
}
const Profile = ({ profile, isLoggedUser }: ProfileProps) => {
    const addAlert = useStore((state) => state.addAlert)
    const { token } = useStore((state) => state.authStore)
    const openModal = useStore((state) => state.openModal)
    const updateProfileBooleanByKey = useStore((state) => state.updateProfileBooleanByKey)
    const [navIndex, setNavIndex] = useState(0)
    const handleClick = (index: number) => setNavIndex(index)
    const navigate = useNavigate()
    const userProfileId = profile.user.id

    const slotsStyles = profileStyle.raw()
    const tabsContent = isLoggedUser ? NAV_CONTENT_LOGGED_USER : NAV_CONTENT_NOT_LOGGED_USER

    useEffect(() => {
        const request = async () => {
            await makeViewRequest({ token, id: userProfileId })
        }
        if (!isLoggedUser) {
            request()
        }
        setNavIndex(0)
    }, [userProfileId])

    const onLikeClick = useCallback(_.debounce(async () => {
        const ret = await makeLikeRequest({ token, id: userProfileId, addAlert })
        if (ret) {
            updateProfileBooleanByKey({ key: 'like' })
        }
    }, 500, { leading: true }), [token, userProfileId])

    const onBlockclick = useCallback(_.debounce(async () => {
        const ret = await makeBlockRequest({ token, id: userProfileId, addAlert })
        if (ret) {
            updateProfileBooleanByKey({ key: 'block' })
        }
    }, 500, { leading: true }), [token, userProfileId])

    const onReportClick = () => {
        openModal({ modalKey: 'report', userToReportId: userProfileId })
    }

    const get_tab_content = () => {
        switch (tabsContent[navIndex]) {
            case 'Likes':
                return <ProfileLikes />
            case 'Matches':
                return <ProfileMatches />
            case 'Photos':
                return <CardsImagesList list={profile.user.images} />
            case 'Vues':
                return <ProfileViewScreen />
            case 'Blocks':
                return <ProfileBlocks />
        }
    }

    return (
        <div className={css(slotsStyles.profileContainer)}>
            <div className={css(slotsStyles.wrapper)}>
                <div className={css(slotsStyles.profilInfosContainer)}>
                    <ProfilePicture className={slotsStyles.profileImg} userImages={profile.user.images} width="300px" height="300px" />
                    <div className={css(slotsStyles.profilContent)}>
                        <div className={css(slotsStyles.profileWrapper)}>
                            <div className={css(slotsStyles.flexContainer)}>
                                <div className={css(slotsStyles.userInfoContainer)}>
                                    <span className={css(slotsStyles.profileName)}>
                                        {profile.user.first_name} {profile.user.last_name}
                                    </span>
                                    <span>{profile.user.age} ans</span>
                                    <div className={css(slotsStyles.profileStatus)} data-isonline={+profile.user.is_connected}></div>
                                    <StarRating isReadOnly initialRating={profile.user.fame_rating} unit="float" />
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
                        {profile.user.last_connection && !profile.user.is_connected && <p className={css(slotsStyles.lastConnectionText)}>Derniere connexion: {getMessageDateString(profile.user.last_connection)}</p>}
                    </div>
                </div>
                <Tabs tabsContent={tabsContent} navIndex={navIndex} handleClick={handleClick} />
                {get_tab_content()}

            </div>

        </div>
    )
}

const ProfileScreen = () => {
    const { userId } = useParams<{ userId?: string }>()
    const { user: loggedUser } = useStore((state) => state.authStore)
    const setProfile = useStore((state) => state.setProfile)
    const profile = useStore((state) => state.profile)
    const { isLoading } = useApi<ProfileStateType>({
        endpoint: 'profile',
        params: { id: userId ? +userId : loggedUser.id },
        setter: setProfile,
        dependencies: [userId],
    })
    const isLoggedUser = !userId || userId && loggedUser.id === +userId

    if (isLoading) {
        return <span>loading...</span>
    }

    if (!isLoading && !profile) {
        return (
            <Screen404 />
        )
    }

    return (
        <Profile profile={profile} isLoggedUser={isLoggedUser} />
    )
}

export default ProfileScreen