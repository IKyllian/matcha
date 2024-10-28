
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IconType } from "react-icons";
import { ImBlocked } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { TbFlag3Filled } from "react-icons/tb";

export type IconButtonType = {
    activeBackgroundColor: string
    inactiveBackgroundColor?: string
    activeIcon: IconType
    inactiveIcon?: IconType
    defaultIconColor?: string
    inactiveIconColor?: string
}

export type ButtonIconKey = 'LIKE' | 'BLOCKED' | 'SETTINGS' | 'REPORT';


export const BUTTONS_ICON: Record<ButtonIconKey, IconButtonType> = {
    LIKE: {
        activeIcon: FaHeart,
        inactiveIcon: FaRegHeart,
        activeBackgroundColor: '#faafe5',
        inactiveBackgroundColor: '#FEF2E8',
        defaultIconColor: '#ed05ab',
        inactiveIconColor: '#ed05ab'
    },
    BLOCKED: {
        activeIcon: ImBlocked,
        activeBackgroundColor: '#FF6B6B',
        inactiveBackgroundColor: '#FEF2E8',
        defaultIconColor: 'black',
        inactiveIconColor: '#FF6B6B'
    },
    SETTINGS: {
        activeIcon: IoSettingsSharp,
        activeBackgroundColor: '#E3DFF2'
    },
    REPORT: {
        activeIcon: TbFlag3Filled,
        activeBackgroundColor: '#FF6B6B',
        inactiveBackgroundColor: '#FEF2E8',
        defaultIconColor: 'black',
        inactiveIconColor: '#FF6B6B'
    }
}