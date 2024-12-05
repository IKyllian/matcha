
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState, useCallback } from 'react';
import FilterSidebar from "front/components/home/filterSidebar";
import Tabs from "front/components/tabs/tabs";
import HomeList from "./homeList";
import HomeSuggestion from "./homeSuggestion";
import { UrlParamsType } from "front/typing/filters";
import { useApi } from "front/hook/useApi";
import { useStore } from "front/store/store";
import { ListStateType } from "front/store/homeList";
import { makeLikeRequest } from "front/api/profile";

type HomeTabs = 'Liste' | 'Suggestion'

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [filters, setFilters] = useState<UrlParamsType>({ min_age: 18, max_age: 100, min_fame: 0, max_pos: 1000, display_liked: true })
  const setFilterList = useStore(state => state.setFilterList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const { filtersList } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)
  const [showSidebar, setShowSidebar] = useState(false)
  const [navIndex, setNavIndex] = useState(0)
  const handleClick = (index: number) => setNavIndex(index)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }
  const tabsContent: HomeTabs[] = ["Liste", "Suggestion"]

  const { isLoading } = useApi<ListStateType[]>({
    endpoint: 'profile',
    urlParams: filters,
    setter: setFilterList,
    dependencies: [filters],
    key: 'list'
  })

  const onFiltersChange = useCallback((filters: UrlParamsType) => {
    console.info('filters = ', filters)
    setFilters({ ...filters })
  }, [])

  const onLikeClick = async (profile_id: number) => {
    const ret = await makeLikeRequest({ token, id: profile_id, addAlert })
    if (ret) {
      updateProfileListLike({ listKey: 'filtersList', profile_id })
    }
  }

  if (isLoading) {
    return <p>loading...</p>
  }

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
        {tabsContent[navIndex] === "Liste" && filtersList && <HomeList list={filtersList} onLikeClick={onLikeClick} />}
        {tabsContent[navIndex] === "Suggestion" && <HomeSuggestion />}
      </div>
    </div>
  )
}

export default Home