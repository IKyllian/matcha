import { css } from "styled-system/css"
import { filterSidebarStyle } from "./filterSidebar.style"
import { useState } from "react"
import useCloseRef from "front/hook/useCloseRef"
import { IoMdClose } from "react-icons/io";
import MultiRangeInput from "front/components/input/multiRange"
import { DEFAULT_FILTERS, UrlParamsType } from "front/typing/filters"
import { Tags } from "front/typing/user"
import { useForm } from "react-hook-form"
import { useApi } from "front/hook/useApi";
import ChipSelect from "front/components/chips/chipSelect";
import { useStore } from "front/store/store";

type FormValues = {
  min_age?: number;
  max_age?: number;
  max_pos?: number;
  min_fame?: number;
  display_liked?: boolean
}

type FilterSidebarProps = {
  onClose: () => void
  onSubmit: (filters: UrlParamsType) => void
  filters: UrlParamsType
  onFiltersReset: () => void
}

const FilterSidebar = ({ onClose, onSubmit, filters, onFiltersReset }: FilterSidebarProps) => {
  const slotsStyles = filterSidebarStyle.raw()
  const ref = useCloseRef({ onClose })
  const { selectedTags } = useStore(store => store.homeState)
  const addSelectedTag = useStore(store => store.addSelectedTag)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<FormValues>({
    defaultValues: filters
  })
  const [tags, setTags] = useState<Tags[]>([])
  const watchMinPos = watch('max_pos')
  const watchMinFame = watch('min_fame')

  const { isLoading } = useApi<Tags[]>({
    endpoint: 'getTags',
    setter: setTags,
    key: 'tags'
  })

  const submit = (values: FormValues) => {
    onSubmit({
      ...values,
      tags: [...selectedTags.map(tag => tag.id)]
    })
  }

  const onFormReset = () => {
    onFiltersReset()
    reset(DEFAULT_FILTERS)
  }

  if (isLoading) {
    return <div> loading...</div>
  }

  return (
    <div className={css(slotsStyles.sidebarContainer)} ref={ref}>
      <IoMdClose className={css(slotsStyles.closeButton)} onClick={onClose} />
      <span className={css(slotsStyles.title)}> Filtrage des profils </span>
      <form className={css(slotsStyles.filtersContainer)} onSubmit={handleSubmit(submit)} onReset={onFormReset} >
        <label>
          Age
          <MultiRangeInput setValue={setValue} min={18} max={100} defaultMin={filters.min_age} defaultMax={filters.max_age} />
        </label>
        <label>
          Position
          <span>{watchMinPos}</span>
          <input {...register('max_pos')} className={css(slotsStyles.rangeInput)} type='range' step={30} min={40} max={1000} defaultValue={1000} />
        </label>
        <label>
          Fame
          <span>{watchMinFame}</span>
          <input {...register('min_fame')} className={css(slotsStyles.rangeInput)} type='range' max={5} min={0} defaultValue={0} />
        </label>
        <label>
          Centre d'interets
          <ChipSelect selectedChips={selectedTags} chips={tags} onChipClick={addSelectedTag} />
        </label>
        <label>
          Afficher utilisateurs like
          <input type='checkbox' className={css(slotsStyles.inputCheckbox)} {...register('display_liked')} />
        </label>
        <div className={css(slotsStyles.buttonContainer)}>
          <button type='reset' className={css(slotsStyles.button)}>Reset</button>
          <button type="submit" className={css(slotsStyles.button)}>Sauvegarder</button>
        </div>
      </form>
    </div>
  )
}

export default FilterSidebar