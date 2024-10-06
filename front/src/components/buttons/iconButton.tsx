import { css } from "styled-system/css"
import { buttonStyle } from "./button.style"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IconType } from "react-icons";

import { ImBlocked } from "react-icons/im";

type IconButtonType = {
  activeBackgroundColor: string
  inactiveBackgroundColor?: string
  activeIcon: IconType
  inactiveIcon?: IconType
  defaultIconColor?: string
  inactiveIconColor?: string
}

export type ButtonIconKey = 'LIKE' | 'BLOCKED';


export const BUTTONS_ICON: Record<ButtonIconKey, IconButtonType> = {
  LIKE: {
    activeIcon: FaHeart,
    inactiveIcon: FaRegHeart,
    activeBackgroundColor: 'lightPink',
    inactiveBackgroundColor: 'secondaryBackground',
    defaultIconColor: 'darkPink',
  },
  BLOCKED: {
    activeIcon: ImBlocked,
    activeBackgroundColor: '#FF6B6B',
    inactiveBackgroundColor: 'secondaryBackground',
    defaultIconColor: '#FF6B6B',
    inactiveIconColor: 'black'
  }
}

type IconButtonProps = {
  status?: boolean;
  onClick?: () => void;
  buttonIcon: IconButtonType
}
const IconButton = ({ status, onClick, buttonIcon }: IconButtonProps) => {
  const { activeBackgroundColor, inactiveBackgroundColor, activeIcon, inactiveIcon, defaultIconColor, inactiveIconColor } = buttonIcon;
  const slotsStyles = buttonStyle.raw()
  const backgroundColor = status === false && inactiveBackgroundColor ? inactiveBackgroundColor : activeBackgroundColor;
  const Icon = status === false && inactiveIcon ? inactiveIcon : activeIcon
  const colorIcon = status === false && inactiveIconColor ? inactiveIconColor : defaultIconColor ? defaultIconColor : ''
  console.info('colorIcon = ', colorIcon)
  const handleClick = () => {
    onClick?.()
  }

  return (
    <div
      onClick={handleClick}
      className={
        css(
          slotsStyles.likeButtonContainer,
          { backgroundColor }
        )
      }
    >
      {<Icon className={css({color: colorIcon})} />}
    </div>
  )
}

export default IconButton