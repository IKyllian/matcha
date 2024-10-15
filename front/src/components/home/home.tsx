import { USERS } from "front/typing/user"
import Card, { CardType } from "front/components/card/card"
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState } from "react";
import FilterSidebar from "front/components/home/filterSidebar";
import Tabs from "front/components/tabs/tabs";

const LIST = [...USERS]

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [showSidebar, setShowSidebar] = useState(false)
  const [navIndex, setNavIndex] = useState(0)
  const handleClick = (index: number) => setNavIndex(index)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }
  const tabsContent = ["Liste", "Suggestion"]

  return (
    <div className={css(slotsStyles.homeContainer)}>
      {
        showSidebar && <FilterSidebar onClose={onSidebarClose} />
      }
      <div className={css(slotsStyles.filterIconContainer)} onClick={onSidebarClose}>
        <MdOutlineFilterAlt className={css(slotsStyles.filterIcon)} />
      </div>
      <div>
        <Tabs tabsContent={tabsContent} navIndex={navIndex} handleClick={handleClick} />
        <div className={css(slotsStyles.listContainer)}>
          {
            LIST.map(user => (
              <Card key={user.id} user={user} cardType='image-content' />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home