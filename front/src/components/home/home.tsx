
import { homeStyle } from "./home.style"
import { css } from "styled-system/css"
import { MdOutlineFilterAlt } from "react-icons/md";
import { useState, useCallback } from 'react';
import FilterSidebar from "front/components/home/filterSidebar";
import Tabs from "front/components/tabs/tabs";
import HomeList from "./homeList";
import HomeSuggestion from "./homeSuggestion";
import { DEFAULT_FILTERS, getKeyBySortValue, SORT_ENUM, UrlParamsType } from "front/typing/filters";
import { useApi } from "front/hook/useApi";
import { useStore } from "front/store/store";
import { ListStateType } from "front/store/homeList";
import { makeLikeRequest } from "front/api/profile";
import Sort from "./sort";
import { sortListByKey } from "front/utils/filters";

type HomeTabs = 'Liste' | 'Suggestion'
const TABS_CONTENT: HomeTabs[] = ["Liste", "Suggestion"]

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [filters, setFilters] = useState<UrlParamsType>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SORT_ENUM>(SORT_ENUM.DISTANCE_ASC)
  const [showSidebar, setShowSidebar] = useState(false)
  const [navIndex, setNavIndex] = useState(0)

  const setFilterList = useStore(state => state.setFilterList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const { filtersList } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)

  const handleClick = (index: number) => setNavIndex(index)
  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }

  const onFiltersReset = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const { isLoading } = useApi<ListStateType[]>({
    endpoint: 'profile',
    urlParams: { ...filters, sort },
    setter: setFilterList,
    dependencies: [filters],
    key: 'list'
  })

  const onFiltersChange = useCallback((filters: UrlParamsType) => {
    console.info('filters = ', filters)
    setFilters({ ...filters })
  }, [])

  const onSortChange = (value: number) => {
    setSort(value)
    setFilterList(sortListByKey({ list: filtersList, order: value % 2, key: getKeyBySortValue(value) }))
  }

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
        showSidebar && TABS_CONTENT[navIndex] === "Liste" && <FilterSidebar filters={filters} onFiltersReset={onFiltersReset} onSubmit={onFiltersChange} onClose={onSidebarClose} />
      }
      {
        TABS_CONTENT[navIndex] === "Liste" &&
        <div className={css(slotsStyles.filterIconContainer)} onClick={onSidebarClose}>
          <MdOutlineFilterAlt className={css(slotsStyles.filterIcon)} />
        </div>
      }
      <div>
        <Tabs tabsContent={TABS_CONTENT} navIndex={navIndex} handleClick={handleClick} />
        {
          TABS_CONTENT[navIndex] === "Liste" && <Sort onChange={onSortChange} />
        }
        {TABS_CONTENT[navIndex] === "Liste" && filtersList && <HomeList list={filtersList} onLikeClick={onLikeClick} />}
        {TABS_CONTENT[navIndex] === "Suggestion" && <HomeSuggestion />}
      </div>
    </div>
  )
}

export default Home