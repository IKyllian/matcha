
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
import { OFFSET_PAGINATION, UrlParamsType } from "front/typing/filters";
import { FaArrowUp } from "react-icons/fa";
import _ from 'lodash'
import { useSearchParams } from "react-router-dom";

type HomeTabs = 'Liste' | 'Suggestion'
const TABS_CONTENT: HomeTabs[] = ["Liste", "Suggestion"]

const Home = () => {
  const slotsStyles = homeStyle.raw()
  const [showSidebar, setShowSidebar] = useState(false)

  const setFilterList = useStore(state => state.setFilterList)
  const token = useStore(state => state.authStore.token)
  const addAlert = useStore(state => state.addAlert)
  const { filtersList, filtersList: { list: listFilters, reachedEnd } } = useStore(state => state.homeState)
  const updateProfileListLike = useStore(state => state.updateProfileListLike)
  const { filters } = useStore(state => state.homeState)
  const setFilters = useStore(state => state.setFilters)
  const resetFilters = useStore(state => state.resetFilters)
  const { sort } = useStore(state => state.homeState)
  const { navIndex } = useStore(state => state.homeState)
  const sortChange = useStore(state => state.sortChange)
  const onNavClick = useStore(state => state.onNavClick)
  const resetList = useStore(state => state.resetList)
  let [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page'))
  // Here to retrieve duplicates if ones. TODO: DELETE
  const duplicates = listFilters.filter((item, index) => listFilters.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.error("DUPLICATE IN FILTER LIST", duplicates)
  }
  //---------------------------------------------------

  useEffect(() => {
    return () => resetList()
  }, [])

  const onSortChange = (value: number) => {
    sortChange(value)
    setSearchParams({ page: '0' })
  }

  const onSidebarClose = () => {
    setShowSidebar(prev => !prev)
  }

  const onFilterChange = (filters: UrlParamsType) => {
    setFilters({ filters, reset: true })
    setShowSidebar(false)
    setSearchParams({ page: '0' })
  }
  const { isLoading } = useApi<ListType>({
    endpoint: 'profile',
    urlParams: { ...filters, sort, offset: +page * OFFSET_PAGINATION },
    setter: setFilterList,
    dependencies: [filters, sort, page],
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
    setSearchParams({ page: `${page + 1}` })
    onScrollClick()
  }
  const onPrevPagination = () => {
    if (+page > 0) {
      setSearchParams({ page: `${page - 1}` })
      onScrollClick()
    }
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
                <Select onChange={onSortChange} defaultValue={sort} />
              </div>
            )
          }
        </div>
        {TABS_CONTENT[navIndex] === "Liste" && listFilters && <HomeList list={filtersList} onLikeClick={onLikeClick} onPrevPagination={onPrevPagination} onNextPagination={onNextPagination} />}
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