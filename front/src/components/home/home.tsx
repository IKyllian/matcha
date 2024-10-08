import { USERS } from "front/typing/user"
import Card, { CardType } from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState } from "react";
import FilterSidebar from "front/components/home/filterSidebar";

const LIST = [...USERS, ...USERS, ...USERS, ...USERS, ...USERS, ...USERS, ...USERS, ...USERS,]
const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [showSidebar, setShowSidebar] = useState(false)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }
  return (
    <div className={css(slotsStyles.homeContainer)}>
      {
        showSidebar && <FilterSidebar onClose={onSidebarClose} />
      }
      <div className={css(slotsStyles.filterIconContainer)} onClick={onSidebarClose}>
        <MdOutlineFilterAlt className={css(slotsStyles.filterIcon)} />
      </div>
      <div className={css(slotsStyles.listContainer)}>
        {
          LIST.map(user => (
            <Card key={user.id} user={user} cardType='image-content' />
          ))
        }
      </div>
    </div>
  )
}

export default Home