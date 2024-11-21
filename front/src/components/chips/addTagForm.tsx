import { useForm } from "react-hook-form"
import { tagFormStyle } from "./addTagForm.style"
import { css } from "styled-system/css"

type FormValues = {
    tag_name: string
}

const AddTagForm = () => {
    const slotsStyles = tagFormStyle.raw()
    const {
        register,
        handleSubmit
    } = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {

    }
    return (
        <div className={css(slotsStyles.tagFormContainer)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={css(slotsStyles.tagInput)} {...register('tag_name')} />
                <button type="submit">Creer</button>
            </form>
        </div>
    )
}

export default AddTagForm