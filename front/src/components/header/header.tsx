import { css } from "styled-system/css"
import { headerStyle } from "./header.style"
import { Link } from "react-router-dom"
import { USERS } from "front/typing/user"
import { IoLogOutOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const USER = USERS[0]
const Header = () => {
    const slotsStyles = headerStyle.raw()
    return (
        <div className={css(slotsStyles.headerContainer)}>
            <p className={css(slotsStyles.headerLogo)}> matcha </p>
            <div className={css(slotsStyles.headerContentWrapper)}>
                <Link to=''>Chat</Link>
                <Link to=''>Profil</Link>
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