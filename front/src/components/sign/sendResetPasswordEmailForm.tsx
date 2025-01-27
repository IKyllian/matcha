import { EMAIL_REGEX, FieldsInputType } from "front/typing/input"
import { User } from "front/typing/user"
import { useForm } from "react-hook-form"
import { formStyle } from "./sign.style"
import { useStore } from "front/store/store"
import { css } from "styled-system/css"
import { makeSendResetPasswordEmailRequest } from "front/api/auth"
import { AlertTypeEnum } from "front/typing/alert"

type FormValues = Pick<User, 'email'>

const FIELDS: FieldsInputType<FormValues>[] = [
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        options: {
            required: true,
            pattern: {
                value: EMAIL_REGEX,
                message: 'Mail invalide'
            }
        }
    },
]
const SendResetPasswordEmailForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()
    const addAlert = useStore(state => state.addAlert)
    const slotsStyles = formStyle.raw()

    const onSubmit = async (data: FormValues) => {
        const ret = await makeSendResetPasswordEmailRequest({
            email: data.email, addAlert
        })

        if (ret?.ok) {
            addAlert({ message: "Email envoyer", type: AlertTypeEnum.SUCCESS })
        }
    }
    return (
        <div className={css({ minHeight: '100vh', display: 'flex' })}>
            <div className={css(slotsStyles.wrapper)}>
                <h2 className={css(slotsStyles.title)}>Send reset password mail</h2>
                <form className={css(slotsStyles.form)} onSubmit={handleSubmit(onSubmit)}>
                    {
                        FIELDS.map(({ name, type, label, options }) => (
                            <label key={name} className={css(slotsStyles.label)}>
                                {label}
                                <input className={css(slotsStyles.inputStyles)} type={type} {...register(name, options)} />
                                {errors?.[name]?.message && <span className={css(slotsStyles.inputError)}>{errors[name].message.toString()}</span>}
                            </label>
                        ))
                    }
                    <button className={css(slotsStyles.button)} type='submit'>Envoyer</button>
                </form>
            </div>
        </div>
    )
}

export default SendResetPasswordEmailForm