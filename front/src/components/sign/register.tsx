import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"
import { useStore } from "front/store/store"
import { User } from "front/typing/user"
import { makeSignUpRequest } from "front/api/sign"
import { EMAIL_REGEX, FieldsInputType, PASSWORD_REGEX } from "front/typing/input"
import { AlertTypeEnum } from "front/typing/alert"
import { useState } from "react"

type FormValues = Pick<User, 'first_name' | 'last_name' | 'username' | 'email' | 'password' | 'birth_date'>
type FormStatusType = 'registered' | 'onProgress'

const FIELDS: FieldsInputType<FormValues>[] = [
    {
        label: 'Prenom',
        name: 'first_name',
        type: 'text',
        options: {
            minLength: {
                value: 2,
                message: "Taille min: 2"
            },
            maxLength: {
                value: 35,
                message: "Taille max: 35"
            },
            required: {
                value: true,
                message: 'Prenom requis'
            }
        }
    },
    {
        label: 'Nom',
        name: 'last_name',
        type: 'text',
        options: {
            minLength: {
                value: 2,
                message: "Taille min: 2"
            },
            maxLength: {
                value: 35,
                message: "Taille max: 35"
            },
            required: {
                value: true,
                message: 'Nom requis'
            }
        }
    },
    {
        label: 'Nom d\'utilisateur',
        name: 'username',
        type: 'text',
        options: {
            required: {
                value: true,
                message: 'Nom d\'utilisateur requis'
            },
            minLength: {
                value: 3,
                message: "Taille min: 3"
            },
            maxLength: {
                value: 20,
                message: "Taille max: 20"
            },
        }
    },
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        options: {
            required: {
                value: true,
                message: 'Email requis'
            },
            pattern: {
                value: EMAIL_REGEX,
                message: 'Mail invalide'
            }
        }
    },
    {
        label: 'Date de naissance',
        name: 'birth_date',
        type: 'date',
        options: {
            required: {
                value: true,
                message: 'Date de naissance requise'
            },
        }
    },
    {
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        options: {
            required: {
                value: true,
                message: 'Mot de passe requis'
            },
            minLength: {
                value: 8,
                message: "Taille min: 8"
            },
            maxLength: {
                value: 50,
                message: "Taille max: 50"
            },
            pattern: {
                value: PASSWORD_REGEX,
                message: "Doit contenir au moins 8 characteres et majuscule, minuscule, nombre, charactere special"
            }
        }
    }
]

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>()
    const addAlert = useStore((state) => state.addAlert)
    const slotsStyles = formStyle.raw()
    const onSubmit = async (data: FormValues) => {
        const ret = await makeSignUpRequest({ data, addAlert })
        if (ret?.ok) {
            addAlert({ message: "Un mail a ete envoyer", type: AlertTypeEnum.SUCCESS })
            setStatus('registered')
        }
    }
    const [status, setStatus] = useState<FormStatusType>('onProgress')

    if (status === 'registered') {
        return (
            <div className={css({ minHeight: '100vh', display: 'flex' })}>
                <div className={css(slotsStyles.wrapper)}>
                    <span className={css(slotsStyles.textConfirm)}>Un email a ete envoyer dans votre boite mail pour activer votre compte. Vous ne pourrez pas vous connecter a votre compte avant de l'activer</span>
                    <Link to='/login' className={css(slotsStyles.loginButton)}>Se connecter</Link>
                </div>
            </div>
        )
    }
    return (
        <div className={css({ minHeight: '100vh', display: 'flex' })}>
            <div className={css(slotsStyles.wrapper)}>
                <h2 className={css(slotsStyles.title)}>Inscrivez-vous</h2>
                <form className={css(slotsStyles.form)} onSubmit={handleSubmit(onSubmit)}>
                    {
                        FIELDS.map(({ name, type, label, options }) => (
                            <label key={name} className={css(slotsStyles.label)}>
                                {label}
                                <input {...register(name, options)} className={css(slotsStyles.inputStyles)} type={type} name={name} />
                                {errors?.[name]?.message && <span className={css(slotsStyles.inputError)}>{errors[name].message.toString()}</span>}
                            </label>
                        ))
                    }
                    <button className={css(slotsStyles.button)} type="submit">Valider</button>
                </form>
                <span className={css(slotsStyles.textInfo)}>Deja un compte ? <Link to="/login">Connectez-vous</Link></span>
            </div>
        </div>
    )
}

export default Register