import { css } from "styled-system/css"
import { headerStyle } from "./header.style"
import { Link } from "react-router-dom"
import { MdLogout } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import NotificationsModal from "front/components/notifications/notificationsModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { useStore } from "front/store/store";
import ProfilePicture from "front/components/utils/profilePicture";

const Header = () => {
    const [openNotif, setOpenNotif] = useState(false)

    const { user } = useStore((state) => state.authStore)
    const notifications = useStore((state) => state.notifications)
    const logoutUser = useStore((state) => state.logoutUser)
    const resetChat = useStore((state) => state.resetChat)
    const resetChatSidebar = useStore((state) => state.resetChatSidebar)
    const deleteAllNotification = useStore((state) => state.deleteAllNotification)
    const closeModal = useStore((state) => state.closeModal)
    const socketDisconnect = useStore((state) => state.socketDisconnect)

    const [cookies, setCookie, removeCookie] = useCookies();
    const slotsStyles = headerStyle.raw()
    const notSeenNotifNumber = notifications.filter(n => !n.was_seen)?.length || 0

    const onCloseNotification = () => {
        setOpenNotif(prev => !prev)
    }

    const onLogout = () => {
        removeCookie(COOKIE_JWT_TOKEN)
        resetChat()
        resetChatSidebar()
        deleteAllNotification()
        closeModal('report')
        socketDisconnect()
        logoutUser()
    }

    return (
        <div className={css(slotsStyles.headerContainer)}>
            <Link to='/' className={css(slotsStyles.headerLogo)}> matcha </Link>
            <div className={css(slotsStyles.headerContentWrapper)}>
                <Link to='/chat'>Chat</Link>
                <Link to='/profile'>Profil</Link>
                <div className={css(slotsStyles.notificationContainer)}>
                    {notSeenNotifNumber > 0 && <div className={css(slotsStyles.notificationBadgeNumber)}><span>{notSeenNotifNumber}</span></div>}
                    <IoMdNotifications onClick={() => setOpenNotif(true)} className={css(slotsStyles.notificationIcon)} />
                    {openNotif && <NotificationsModal onClose={onCloseNotification} />}
                </div>
                <Link to='/profile' className={css(slotsStyles.headerAvatar)}>
                    <ProfilePicture userImages={user.images} />
                </Link>
                <div className={css(slotsStyles.divider)}> </div>
                <div className={css(slotsStyles.logoutWrapper)} onClick={onLogout}>
                    <MdLogout className={css(slotsStyles.logoutIcon)} />
                </div>
            </div>
        </div>
    )
}

export default Header