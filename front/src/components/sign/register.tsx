import { RegisterOptions, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"
import { useStore } from "front/store/store"
import { User } from "front/typing/user"
import { useEffect } from "react"
import { makeSignUpRequest } from "front/api/sign"
import { COOKIE_JWT_TOKEN } from "front/constant/cookie"
import { useCookies } from "react-cookie"
import { makeIpAddressRequest } from "front/api/auth"
import { FieldsInputType } from "front/typing/input"

type FormValues = Pick<User, 'first_name' | 'last_name' | 'username' | 'email' | 'password' | 'birth_date'>

const FIELDS: FieldsInputType<FormValues>[] = [
    {
        label: 'Prenom',
        name: 'first_name',
        type: 'text',
        options: {
            maxLength: 35,
            required: true
        }
    },
    {
        label: 'Nom',
        name: 'last_name',
        type: 'text',
        options: {
            maxLength: 35,
            required: true
        }
    },
    {
        label: 'Nom d\'utilisateur',
        name: 'username',
        type: 'text',
        options: {
            required: true,
            minLength: 3,
            maxLength: 20
        }
    },
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        options: {
            required: true,
            pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Mail invalide'
            }
        }
    },
    {
        label: 'Date de naissance',
        name: 'birth_date',
        type: 'date',
        options: {
            required: true
        }
    },
    {
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        options: {
            required: true
        }
    }
]

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>()
    const [cookies, setCookie, removeCookie] = useCookies();
    const authStore = useStore((state) => state.authStore)
    const logUser = useStore((state) => state.logUser)
    const addAlert = useStore((state) => state.addAlert)
    const navigate = useNavigate()
    const slotsStyles = formStyle.raw()
    const onSubmit = async (data: FormValues) => {
        const { ip } = await makeIpAddressRequest()
        const ret = await makeSignUpRequest({ data, addAlert, ip })
        if (ret) {
            const { user, access_token } = ret
            logUser(user, access_token)
            setCookie(COOKIE_JWT_TOKEN, access_token)
        }
    }

    useEffect(() => {
        if (authStore.isLogged) {
            navigate('/')
        }
    }, [authStore.isLogged])

    return (
        <div className={css({ minHeight: '100vh', display: 'flex' })}>
            <div className={css(slotsStyles.wrapper)}>
                <h2 className={css(slotsStyles.title)}>Incrvivez-vous</h2>
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