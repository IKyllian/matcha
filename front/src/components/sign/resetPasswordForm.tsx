import { makeResetPasswordRequest } from "front/api/auth"
import { useStore } from "front/store/store"
import { AlertTypeEnum } from "front/typing/alert"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from 'react-router-dom';
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"
import { FieldsInputType } from "front/typing/input"
import { useApi } from "front/hook/useApi"
import Screen404 from "front/components/utils/404"

type FormValues = {
    password: string
    confirmPasword: string
}
type StatusType = 'success' | 'changing'


const ResetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<FormValues>()
    const { url_identifier } = useParams<{ url_identifier: string }>()
    const [isValidIdentifier, setIsValidIdentifier] = useState(false)
    const [status, setStatus] = useState<StatusType>('changing')
    const addAlert = useStore(state => state.addAlert)
    const slotsStyles = formStyle.raw()
    const { isLoading } = useApi<boolean>({
        endpoint: 'checkUrlIdentifier',
        urlParams: { url_identifier },
        setter: setIsValidIdentifier,
        key: 'ok',
        useToken: false
    })
    const navigate = useNavigate()

    const FIELDS: FieldsInputType<FormValues>[] = [
        {
            label: 'Nouveau mot de passe',
            name: 'password',
            type: 'password',
            options: {
                required: true,
                validate: value => value === getValues('confirmPasword')
            }
        },
        {
            label: 'Confirmation nouveau mot de passe',
            name: 'confirmPasword',
            type: 'password',
            options: {
                required: true,
                validate: value => value === getValues('password') || "Les deux mots de passe doivent etre identique",
            }
        }
    ]

    const onSubmit = async (data: FormValues) => {
        const { ok } = await makeResetPasswordRequest({
            data: {
                pass: data.password,
                url_identifier
            },
            addAlert
        })

        if (ok) {
            addAlert({ message: "Mot de passe mis a jour", type: AlertTypeEnum.SUCCESS })
            setStatus('success')
            navigate('/login')
        }
    }

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (!isLoading && !isValidIdentifier) {
        return <Screen404 />
    }
    return (
        <div className={css({ minHeight: '100vh', display: 'flex' })}>
            {
                status !== 'success' && (
                    <div className={css(slotsStyles.wrapper)}>
                        <h2 className={css(slotsStyles.title)}>Reset mot de passe</h2>
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
                            <button className={css(slotsStyles.button)} type='submit'>Valider</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default ResetPasswordForm