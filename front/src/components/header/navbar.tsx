import { css } from "styled-system/css"
import { navbarStyle } from "./navbar.style"
import { FaHome } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useLogout } from "front/hook/useLogout";

const CONTENT = [
    {
        icon: FaHome,
        path: '/'
    },
    {
        icon: IoIosChatbubbles,
        path: '/chat'
    },
    {
        icon: IoMdNotifications,
        path: '/notifications'
    },
    {
        icon: FaUser,
        path: '/profile'
    },
    {
        icon: MdLogout,
        path: '',
        style: {
            color: 'red'
        },
    },
]

const NavBar = () => {
    const slotsStyles = navbarStyle.raw()
    const location = useLocation()
    const { onLogout } = useLogout()

    return (
        <div className={css(slotsStyles.navBarContainer)}>
            <div className={css(slotsStyles.contentWrapper)}>

                {
                    CONTENT.map((elem, index) => (
                        <Link
                            key={index}
                            to={elem.path}
                            className={css(slotsStyles.iconContainer)}
                            // data-isactive={+(new RegExp(elem.path).test(location.pathname))}
                            data-isactive={+(location.pathname === elem.path)}
                            onClick={elem.icon === MdLogout ? onLogout : undefined}
                        >
                            <elem.icon className={css(slotsStyles.icon, elem.style)} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default NavBar