import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"
import { useStore } from "front/store/store"
import { makeSignInRequest } from "front/api/sign"
import { User } from "front/typing/user"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { COOKIE_JWT_TOKEN } from "front/constant/cookie"

type FormValues = Pick<User, 'username' | 'password'>

type FieldsType = {
    label: string
    type: string
    name: keyof FormValues
    required?: boolean
}
const FIELDS: FieldsType[] = [
    {
        label: 'Username',
        name: 'username',
        type: 'text',
        required: true,
    },
    {
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        required: true,
    }
]

const Login = () => {
    const {
        register,
        handleSubmit,
    } = useForm<FormValues>()
    const [cookies, setCookie, removeCookie] = useCookies();
    const authStore = useStore((state) => state.authStore)
    const addAlert = useStore((state) => state.addAlert)
    const logUser = useStore((state) => state.logUser)
    const setNotifications = useStore((state) => state.setNotifications)
    const navigate = useNavigate()
    const slotsStyles = formStyle.raw()
    const initSocket = useStore((state) => state.initSocket)

    const onSubmit = async (data: FormValues) => {
        const ret = await makeSignInRequest({ data, addAlert })
        if (ret) {
            const { user, access_token, notifications } = ret
            logUser(user, access_token)
            setNotifications(notifications)
            initSocket({ token: access_token })
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
                <h2 className={css(slotsStyles.title)}>Connectez-vous</h2>
                <form className={css(slotsStyles.form)} onSubmit={handleSubmit(onSubmit)}>
                    {
                        FIELDS.map(({ name, type, required, label }) => (
                            <label key={name} className={css(slotsStyles.label)}>
                                {label}
                                <input {...register(name)} className={css(slotsStyles.inputStyles)} type={type} name={name} required={required} />
                                {name === 'password' && <span className={css(slotsStyles.forgotPassword)}><Link to="/resetPassword">Mot de passe oublier ?</Link></span>}
                            </label>
                        ))
                    }
                    <button className={css(slotsStyles.button)} type="submit">Valider</button>
                </form>
                <span className={css(slotsStyles.textInfo)}>Pas de compte ? <Link to="/register">Inscrivez-vous</Link></span>
            </div>
        </div>
    )
}

export default Login