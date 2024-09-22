import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"

type FormValues = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

type FieldsType = {
    label: string
    type: string
    name: keyof FormValues
    required?: boolean
}
const FIELDS: FieldsType[] = [
    {
        label: 'Prenom',
        name: 'firstName',
        type: 'text',
        required: true,
    },
    {
        label: 'Nom',
        name: 'lastName',
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
        type: 'email',
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

    const navigate = useNavigate()
    const slotsStyles = formStyle.raw()
    const onSubmit = (data: FormValues) => {
        console.info('data = ', data)
        navigate('profile')
    }
    
    return (
        <div className={css({minHeight: '100vh', display: 'flex'})}>
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