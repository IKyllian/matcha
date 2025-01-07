import { css } from "styled-system/css"

const Screen404 = () => {
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                position: 'absolute',
                margin: 'auto',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            })}
        >
            <span
                className={css({
                    color: 'buttonPrimaryBackground',
                    fontSize: '9rem',
                    fontWeight: 'bold',
                    textShadow: "0.3rem 0.3rem 0rem #121212",
                    WebkitTextStroke: "0.1rem #121212"
                })}
            >
                404 not found
            </span>
        </div>
    )
}

export default Screen404