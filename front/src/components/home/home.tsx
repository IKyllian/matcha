
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState, useCallback } from 'react';
import FilterSidebar from "front/components/home/filterSidebar";
import Tabs from "front/components/tabs/tabs";
import HomeList from "./homeList";
import HomeSuggestion from "./homeSuggestion";
import { UrlParamsType } from "front/typing/filters";
import { User } from "front/typing/user";
import { useApi } from "front/hook/useApi";
import { useStore } from "front/store/store";

type HomeTabs = 'Liste' | 'Suggestion'

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const user = useStore(state => state.authStore.user)
  const [filters, setFilters] = useState<UrlParamsType>({ min_age: 20 })
  const [filteredList, setFilteredList] = useState<Partial<User[]>>([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [navIndex, setNavIndex] = useState(0)
  const handleClick = (index: number) => setNavIndex(index)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }
  const tabsContent: HomeTabs[] = ["Liste", "Suggestion"]

  const { isLoading } = useApi<Partial<User[]>>({
    endpoint: 'profile',
    urlParams: filters,
    setter: setFilteredList,
    dependencies: [filters],
  })

  const onFiltersChange = useCallback((filters: UrlParamsType) => {
    console.info('filters = ', filters)
    setFilters(filters)
  }, [])

  return (
    <div className={css(slotsStyles.homeContainer)}>
      {
        showSidebar && tabsContent[navIndex] === "Liste" && <FilterSidebar filters={filters} onSubmit={onFiltersChange} onClose={onSidebarClose} />
      }
      {
        tabsContent[navIndex] === "Liste" &&
        <div className={css(slotsStyles.filterIconContainer)} onClick={onSidebarClose}>
          <MdOutlineFilterAlt className={css(slotsStyles.filterIcon)} />
        </div>
      }
      <div>
        <Tabs tabsContent={tabsContent} navIndex={navIndex} handleClick={handleClick} />
        {tabsContent[navIndex] === "Liste" && <HomeList list={filteredList} />}
        {tabsContent[navIndex] === "Suggestion" && <HomeSuggestion />}
      </div>
    </div>
  )
}

export default Home