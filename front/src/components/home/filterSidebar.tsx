import { css } from "styled-system/css"
import { filterSidebarStyle } from "./filterSidebar.style"
import { useState } from "react"
import useCloseRef from "front/hook/useCloseRef"
import { IoMdClose } from "react-icons/io";
import MultiRangeInput from "front/components/input/multiRange"
import { UrlParamsType } from "front/typing/filters"
import { Tags } from "front/typing/user"
import { useForm } from "react-hook-form"
import { useApi } from "front/hook/useApi";
import ChipSelect from "front/components/chips/chipSelect";

type FormValues = {
  min_age?: number;
  max_age?: number;
  max_pos?: number;
  min_fame?: number;
}

type FilterSidebarProps = {
  onClose: () => void
  onSubmit: (filters: UrlParamsType) => void
  filters: UrlParamsType
}

const FilterSidebar = ({ onClose, onSubmit, filters }: FilterSidebarProps) => {
  const slotsStyles = filterSidebarStyle.raw()
  const ref = useCloseRef({ onClose })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: filters
  })
  const [tags, setTags] = useState<Tags[]>([])
  const [selectedChips, setSelectedChips] = useState<Tags[]>([])

  const { isLoading } = useApi<Tags[]>({
    endpoint: 'getTags',
    setter: setTags,
    key: 'tags'
  })

  const onChipClick = (chip: Tags, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChips(prev => [...prev.filter(c => c.id !== chip.id)])
    } else {
      setSelectedChips(prev => [...prev, chip])
    }
  }

  const submit = (values: FormValues) => {
    onSubmit({
      ...values,
      tags: [...selectedChips]
    })
  }

  if (isLoading) {
    return <div> loading...</div>
  }

  return (
    <div className={css(slotsStyles.sidebarContainer)} ref={ref}>
      <IoMdClose className={css(slotsStyles.closeButton)} onClick={onClose} />
      <span className={css(slotsStyles.title)}> Filtrage des profils </span>
      <form className={css(slotsStyles.filtersContainer)} onSubmit={handleSubmit(submit)} >
        <label>
          Age
          <MultiRangeInput min={18} max={100} />
          <input {...register('min_age')} type='range' min={18} max={100} defaultValue={18} />
          <input {...register('max_age')} type='range' min={18} max={100} defaultValue={100} />
        </label>
        <label>
          Position
          <input {...register('max_pos')} type='range' />
        </label>
        <label>
          Fame
          <input {...register('min_fame')} type='range' max={5} min={0} defaultValue={undefined} disabled />
        </label>
        <label>
          Centre d'interets
          <ChipSelect selectedChips={selectedChips} chips={tags} onChipClick={onChipClick} />
        </label>
        <button type="submit" className={css(slotsStyles.button)}> Sauvegarder </button>
      </form>
    </div>
  )
}

export default FilterSidebar