
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState } from 'react';
import FilterSidebar from "front/components/home/filterSidebar";
import Tabs from "front/components/tabs/tabs";
import HomeList from "./homeList";
import HomeSuggestion from "./homeSuggestion";
import { useApi } from "front/hook/useApi";
import { useStore } from "front/store/store";
import { ListType } from "front/store/homeList";
import { makeLikeRequest } from "front/api/profile";
import Select from "front/components/input/select";
import { UrlParamsType } from "front/typing/filters";
import { FaArrowUp } from "react-icons/fa";

type HomeTabs = 'Liste' | 'Suggestion'
const TABS_CONTENT: HomeTabs[] = ["Liste", "Suggestion"]

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [showSidebar, setShowSidebar] = useState(false)
  const [navIndex, setNavIndex] = useState(0)

  const setFilterList = useStore(state => state.setFilterList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const { filtersList, filtersList: { list: listFilters } } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)
  const { filters } = useStore(state => state.homeState)
  const setFilters = useStore(state => state.setFilters)
  const resetFilters = useStore(state => state.resetFilters)
  const { sort } = useStore(state => state.homeState)
  const sortChange = useStore(state => state.sortChange)

  const duplicate = listFilters.filter((item, index) => listFilters.indexOf(item) !== index)
  if (duplicate.length > 0) {
    console.error("DOUBLON DANS LA LISTE", duplicate)
  }

  const handleClick = (index: number) => setNavIndex(index)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }

  const onFilterChange = (filters: UrlParamsType) => {
    setFilters({ filters, reset: true })
    setShowSidebar(false)
  }
  const { isLoading } = useApi<ListType>({
    endpoint: 'profile',
    urlParams: { ...filters, sort },
    setter: setFilterList,
    dependencies: [filters, sort],
  })

  const onLikeClick = async (profile_id: number) => {
    const ret = await makeLikeRequest({ token, id: profile_id, addAlert })
    if (ret) {
      updateProfileListLike({ listKey: 'filtersList', profile_id })
    }
  }

  const onScrollClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const onNextPagination = () => {
    setFilters({ filters })
  }

  return (
    <div className={css(slotsStyles.homeContainer)}>
      {
        showSidebar && TABS_CONTENT[navIndex] === "Liste" && <FilterSidebar filters={filters} onFiltersReset={resetFilters} onSubmit={onFilterChange} onClose={onSidebarClose} />
      }
      {
        TABS_CONTENT[navIndex] === "Liste" &&
        <div className={css(slotsStyles.filterIconContainer)} onClick={onSidebarClose}>
          <MdOutlineFilterAlt className={css(slotsStyles.filterIcon)} />
        </div>
      }
      <div>
        <div className={css(slotsStyles.listHeaderWrapper)}>
          <Tabs tabsContent={TABS_CONTENT} navIndex={navIndex} handleClick={handleClick} />
          {
            TABS_CONTENT[navIndex] === "Liste" && (
              <div className={css({ display: 'flex', justifyContent: 'center' })}>
                <Select onChange={sortChange} defaultValue={sort} />
                <span>Length: {listFilters.length}</span>
              </div>
            )
          }
        </div>
        {TABS_CONTENT[navIndex] === "Liste" && listFilters && <HomeList list={filtersList} onLikeClick={onLikeClick} onNextPagination={onNextPagination} />}
        {TABS_CONTENT[navIndex] === "Suggestion" && <HomeSuggestion />}
      </div>
      {
        isLoading && <p>loading...</p>
      }
      {
        TABS_CONTENT[navIndex] === "Liste" &&
        <div className={css(slotsStyles.arrowContainer)} onClick={onScrollClick}>
          <FaArrowUp />
        </div>
      }
    </div>
  )
}

export default Home