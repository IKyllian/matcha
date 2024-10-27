import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"
import { useStore } from "front/store/store"
import { User } from "front/typing/user"
import { useEffect } from "react"
import { makeSignUpRequest } from "front/api/sign"
import { COOKIE_JWT_TOKEN } from "front/constant/cookie"
import { useCookies } from "react-cookie"

type FormValues = Pick<User, 'firstname' | 'lastname' | 'username' | 'email' | 'password'>

type FieldsType = {
    label: string
    type: string
    name: keyof FormValues
    required?: boolean
}

const FIELDS: FieldsType[] = [
    {
        label: 'Prenom',
        name: 'firstname',
        type: 'text',
        required: true,
    },
    {
        label: 'Nom',
        name: 'lastname',
        type: 'text',
        required: true,
    },
    {
        label: 'Nom d\'utilisateur',
        name: 'username',
        type: 'text',
        required: true,
    },
    {
        label: 'Email',
        name: 'email',
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

const Sign = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()
    const [cookies, setCookie, removeCookie] = useCookies();
    const authStore = useStore((state) => state.authStore)
    const logUser = useStore((state) => state.logUser)
    const navigate = useNavigate()
    const slotsStyles = formStyle.raw()
    const onSubmit = async (data: FormValues) => {
        console.info('data = ', data)
        const { user, access_token } = await makeSignUpRequest(data)
        logUser(user)
        if (access_token) {
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
                <h2 className={css(slotsStyles.title)}> Incrvivez-vous </h2>
                <form className={css(slotsStyles.form)} onSubmit={handleSubmit(onSubmit)}>
                    {
                        FIELDS.map(({ name, type, required, label }) => (
                            <label key={name} className={css(slotsStyles.label)}>
                                {label}
                                <input {...register(name)} className={css(slotsStyles.inputStyles)} type={type} name={name} required={required} />
                            </label>
                        ))
                    }
                    <button className={css(slotsStyles.button)} type="submit">Valider</button>
                </form>
            </div>
        </div>
    )
}

export default Sign