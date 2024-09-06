import { css, sva } from "styled-system/css"

const formStyle = sva({
    slots: ['wrapper', 'title', 'form', 'label'],
    base: {
        title: {
            textAlign: 'center',
            fontWeight: '800',
            fontSize: '28px',
            fontFamily: 'title',
            letterSpacing: '1.5px'
        },
        wrapper: {
            backgroundColor: 'secondaryBackground',
            width: '600px',
            height: '600px',
            padding: '24px',
            boxShadow: '2.5px 2.5px 0 black',
            borderRadius: '7px',
            border: '2px solid black',
            margin: 'auto',
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'space-evenly',
        },
        form: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
        },
        label: {
            display: 'flex',
            flexDir: 'column',
            textStyle: 'label',
            width: 'fit-content',
            fontWeight: '800',
        }
    }
})

type InputProps = {
    type: string,
    name: string,
    required?: boolean,
}

const inputStyles = css({
    border: '2px solid black',
    rounded: '5px',
    width: '300px',
    height: '50px',
    padding: '4px',
    _focus: {
        outline: 'none',
    }
})

const buttonStyle = css({
    width: '300px',
    height: '50px',
    border: '2px solid black',
    boxShadow: '2.5px 2.5px 0 black',
    backgroundColor: 'buttonPrimaryBackground',
    borderRadius: '7px',
    fontWeight: '500',
    fontSize: '20px',
    marginTop: '12px',
    fontFamily: 'body',
    _hover: {
        boxShadow: '4px 4px 0 black',
    }
})

const Input = ({ type, name, required }: InputProps) => (
    <input className={inputStyles} type={type} name={name} required={required} />
)

const Sign = () => {
    const slotsStyles = formStyle.raw()

    return (
        <div className={css({minHeight: '100vh', display: 'flex'})}>
            <div className={css(slotsStyles.wrapper)}>
                <h2 className={css(slotsStyles.title)}> Incrvivez-vous </h2>
                <form className={css(slotsStyles.form)}>
                    <label className={css(slotsStyles.label)}>
                        Prenom
                        <Input type="text" name="firstName" required />
                    </label>
                    <label className={css(slotsStyles.label)}>
                        Nom
                        <Input type="text" name="lastName" required/>
                    </label>
                    <label className={css(slotsStyles.label)}>
                        Pseudo
                        <Input type="text" name="username" required/>
                    </label>
                    <label className={css(slotsStyles.label)}>
                        Email
                        <Input type="text" name="email" required/>
                    </label>
                    <button className={buttonStyle} type="submit">Valider</button>
                </form>
            </div>
        </div>
    )
}

export default Sign