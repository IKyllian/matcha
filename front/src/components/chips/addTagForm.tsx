import { useForm } from "react-hook-form"
import { tagFormStyle } from "./addTagForm.style"
import { css } from "styled-system/css"
import { makeTagsCreateRequest } from "front/api/profile"
import { useStore } from "front/store/store"
import { Tags } from "front/typing/user"
import { AlertTypeEnum } from 'front/typing/alert';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
type FormValues = {
    tag_name: string
}

type AddTagFormProps = {
    onSubmit: (tag: Tags) => void
    onCancel: () => void
}
const AddTagForm = ({ onSubmit, onCancel }: AddTagFormProps) => {
    const slotsStyles = tagFormStyle.raw()
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FormValues>()
    const { token } = useStore((state) => state.authStore)
    const addAlert = useStore((state) => state.addAlert)

    const onTagSubmit = async (data: FormValues) => {
        const { tag_name } = data
        const { tag } = await makeTagsCreateRequest({ token, addAlert, tag_name })
        if (tag) {
            onSubmit(tag)
            addAlert({ message: `Tag "${tag.tag_name}" cree`, type: AlertTypeEnum.SUCCESS })
            reset()
        }
    }

    return (
        <div className={css(slotsStyles.tagFormContainer)}>
            <input className={css(slotsStyles.tagInput)} placeholder="Nom du tag..." {...register('tag_name')} />
            <div className={css(slotsStyles.buttonContainer)}>
                <button className={css(slotsStyles.buttonIcon, slotsStyles.checkIcon)} onClick={handleSubmit(onTagSubmit)}>
                    <FaCheck />
                </button>
                <button className={css(slotsStyles.buttonIcon, slotsStyles.closeIcon)} onClick={onCancel}>
                    <IoMdClose />
                </button>
            </div>
        </div>
    )
}

export default AddTagForm