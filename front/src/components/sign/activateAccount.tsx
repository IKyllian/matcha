import { makeActivateAccountRequest } from "front/api/auth"
import { useStore } from "front/store/store"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { css } from "styled-system/css"
import { formStyle } from "./sign.style"

type ComponentStatus = 'loading' | 'loaded' | 'error'
const ActivateAccount = () => {
    const { url_identifier } = useParams<{ url_identifier: string }>()
    const [status, setLoading] = useState<ComponentStatus>('loading')
    const addAlert = useStore(store => store.addAlert)
    const slotsStyles = formStyle.raw()

    useEffect(() => {
        const makeRequest = async () => {
            const ret = await makeActivateAccountRequest({ url_identifier, addAlert })
            if (ret) {
                setLoading('loaded')
            } else {
                setLoading('error')
            }
        }
        if (url_identifier) {
            makeRequest()
        }
    }, [])
    if (status === 'loading') return <span>loading...</span>
    return (
        <div className={css({ minHeight: '100vh', display: 'flex' })}>
            <div className={css(slotsStyles.wrapper)}>
                {status === 'error' && <span className={css(slotsStyles.textConfirm)}>Url non valide</span>}
                {status === 'loaded' && (
                    <>
                        <span className={css(slotsStyles.textConfirm)}>Votre compte a ete valide</span>
                        <Link to='/login' className={css(slotsStyles.loginButton)}>Se connecter</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default ActivateAccount