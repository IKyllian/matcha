
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState } from "react";
import FilterSidebar from "front/components/home/filterSidebar";
import Tabs from "front/components/tabs/tabs";
import HomeList from "./homeList";
import HomeSuggestion from "./homeSuggestion";

type HomeTabs = 'Liste' | 'Suggestion'

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [showSidebar, setShowSidebar] = useState(false)
  const [navIndex, setNavIndex] = useState(0)
  const handleClick = (index: number) => setNavIndex(index)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }
  const tabsContent: HomeTabs[] = ["Liste", "Suggestion"]

  return (
    <div className={css(slotsStyles.homeContainer)}>
      {
        showSidebar && tabsContent[navIndex] === "Liste" && <FilterSidebar onClose={onSidebarClose} />
      }
      {
        tabsContent[navIndex] === "Liste" &&
        <div className={css(slotsStyles.filterIconContainer)} onClick={onSidebarClose}>
          <MdOutlineFilterAlt className={css(slotsStyles.filterIcon)} />
        </div>
      }
      <div>
        <Tabs tabsContent={tabsContent} navIndex={navIndex} handleClick={handleClick} />
        {tabsContent[navIndex] === "Liste" && <HomeList />}
        {tabsContent[navIndex] === "Suggestion" && <HomeSuggestion />}
      </div>
    </div>
  )
}

export default Home