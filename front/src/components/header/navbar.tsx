import { css } from "styled-system/css"
import { navbarStyle } from "./navbar.style"
import { FaHome } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useLogout } from "front/hook/useLogout";
import { useStore } from "front/store/store";

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
        path: undefined,
        style: {
            color: 'red'
        },
    },
]

const checkPath = (pathSplit: string[] | undefined, locationPathname: string): number => {
    if (!pathSplit || (pathSplit?.length <= 1)) return 0
    const path = pathSplit[1]
    if (path === "") return +(locationPathname === '/')
    return +(pathSplit ? (new RegExp(path).test(locationPathname)) : false)
}

const NavBar = () => {
    const slotsStyles = navbarStyle.raw()
    const location = useLocation()
    const { onLogout } = useLogout()
    const notifications = useStore((state) => state.notifications)
    const notSeenNotifNumber = notifications.filter(n => !n.was_seen)?.length || 0

    return (
        <div className={css(slotsStyles.navBarContainer)}>
            <div className={css(slotsStyles.contentWrapper)}>
                {
                    CONTENT.map((elem, index) => {
                        const pathSplit = elem.path?.split('/') || undefined
                        return (
                            <Link
                                key={index}
                                to={elem.path}
                                className={css(slotsStyles.iconContainer)}
                                data-isactive={checkPath(pathSplit, location.pathname)}
                                onClick={elem.icon === MdLogout ? onLogout : undefined}
                            >
                                {
                                    notSeenNotifNumber > 0 &&
                                    new RegExp("notifications").test(elem.path) &&
                                    <div className={css(slotsStyles.notificationBadgeNumber)}><span>{notSeenNotifNumber}</span></div>
                                }
                                <elem.icon className={css(slotsStyles.icon, elem.style)} />
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default NavBar