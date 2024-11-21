import _ from 'lodash'
import { useForm } from "react-hook-form"
import { searchTagStyle } from './searchTag.style'
import { css } from 'styled-system/css'
import { FaSearch } from "react-icons/fa";

type FormValues = {
    searchTag: string
}

type SearchTagProps = {
    onChange: (tagNameToSearch: string) => void
}

const SearchTag = ({ onChange }: SearchTagProps) => {
    const {
        register,
    } = useForm<FormValues>()
    const slotsStyles = searchTagStyle.raw()

    return (
        <div className={css(slotsStyles.searchTagContainer)}>
            <input
                className={css(slotsStyles.tagInput)}
                name='searchTag'
                {...register('searchTag')}
                onChange={_.debounce((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), 500)}
            />
            <FaSearch className={css(slotsStyles.icon)} />
        </div>
    )
}

export default SearchTag