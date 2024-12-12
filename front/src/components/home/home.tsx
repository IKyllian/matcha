
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useEffect, useState, useCallback } from 'react';
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
import _ from 'lodash'

type HomeTabs = 'Liste' | 'Suggestion'
const TABS_CONTENT: HomeTabs[] = ["Liste", "Suggestion"]

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [showSidebar, setShowSidebar] = useState(false)

  const setFilterList = useStore(state => state.setFilterList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const { filtersList, filtersList: { list: listFilters } } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)
  const { filters } = useStore(state => state.homeState)
  const setFilters = useStore(state => state.setFilters)
  const resetFilters = useStore(state => state.resetFilters)
  const { sort } = useStore(state => state.homeState)
  const { navIndex } = useStore(state => state.homeState)
  const sortChange = useStore(state => state.sortChange)
  const onNavClick = useStore(state => state.onNavClick)
  const resetList = useStore(state => state.resetList)

  useEffect(() => {
    return () => resetList()
  }, [])

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

  const onLikeClick = useCallback(_.debounce(async (profile_id: number) => {
    const ret = await makeLikeRequest({ token, id: profile_id, addAlert })
    if (ret) {
      updateProfileListLike({ listKey: 'filtersList', profile_id })
    }
  }, 500, { leading: true }), [token])

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
          <Tabs tabsContent={TABS_CONTENT} navIndex={navIndex} handleClick={onNavClick} />
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