import { css } from "styled-system/css"
import { headerStyle } from "./header.style"
import { Link } from "react-router-dom"
import { USERS } from "front/typing/user"
import { MdLogout } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import NotificationsModal from "front/components/notifications/notificationsModal";
import { useState } from "react";

const USER = USERS[0]
const Header = () => {
    const [openNotif, setOpenNotif] = useState(false)
    const slotsStyles = headerStyle.raw()

    const onCloseNotification = () => {
        setOpenNotif(prev => !prev)
    }
    
    return (
        <div className={css(slotsStyles.headerContainer)}>
            <p className={css(slotsStyles.headerLogo)}> matcha </p>
            <div className={css(slotsStyles.headerContentWrapper)}>
                <Link to='/chat'>Chat</Link>
                <Link to='/profile'>Profil</Link>
                <div className={css(slotsStyles.notificationContainer)}>
                    <IoMdNotifications onClick={onCloseNotification} className={css(slotsStyles.notificationIcon)} />
                    {openNotif && <NotificationsModal onClose={onCloseNotification} />}
                </div>
                <div className={css(slotsStyles.headerAvatar)}>
                    <img src={USER.img} alt='image de profil' />
                </div>
                <div className={css(slotsStyles.divider)}> </div>
                <div className={css(slotsStyles.logoutWrapper)}>
                    <MdLogout className={css(slotsStyles.logoutIcon)} />
                </div>
            </div>
        </div>
    )
}

export default Header