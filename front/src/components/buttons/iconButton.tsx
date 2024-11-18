import { css } from "styled-system/css"
import { buttonStyle } from "./button.style"
import { IconButtonType } from "front/typing/button";

type IconButtonProps = {
  status?: boolean;
  onClick?: () => void;
  buttonIcon: IconButtonType
}

const IconButton = ({ status = false, onClick, buttonIcon }: IconButtonProps) => {
  const { activeBackgroundColor, inactiveBackgroundColor, activeIcon, inactiveIcon, defaultIconColor, inactiveIconColor } = buttonIcon;
  const slotsStyles = buttonStyle.raw()
  const backgroundColor = status === false && inactiveBackgroundColor ? inactiveBackgroundColor : activeBackgroundColor;
  const Icon = status === false && inactiveIcon ? inactiveIcon : activeIcon
  const colorIcon = status === false && inactiveIconColor ? inactiveIconColor : defaultIconColor ? defaultIconColor : 'black'

  const handleClick = () => {
    onClick?.()
  }

  return (
    <div
      onClick={handleClick}
      className={
        css(
          slotsStyles.likeButtonContainer,
        )
      }
      style={{
        backgroundColor
      }}
    >
      {<Icon style={{
        color: colorIcon
      }} />}
    </div>
  )
}

export default IconButton