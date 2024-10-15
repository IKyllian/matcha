import { Link } from "react-router-dom"
import { bannerStyle } from "./banner.style"
import { css } from "styled-system/css"

const Banner = () => {
  const slotsStyles = bannerStyle.raw()
  return (
    <div className={css(slotsStyles.bannerContainer)}>
        <span> Complétez votre profil pour interagir avec les autres utilisateurs </span>
        <Link to='settings'> Settings </Link>
    </div>
  )
}

export default Banner