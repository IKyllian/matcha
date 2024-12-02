import { makeActivateAccountRequest } from "front/api/auth"
import { useStore } from "front/store/store"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type ComponentStatus = 'loading' | 'loaded' | 'error'
const ActivateAccount = () => {
    const { url_identifier } = useParams<{ url_identifier: string }>()
    const [status, setLoading] = useState<ComponentStatus>('loading')
    const addAlert = useStore(store => store.addAlert)

    useEffect(() => {
        const makeRequest = async () => {
            const { ok } = await makeActivateAccountRequest({ url_identifier, addAlert })
            if (ok) {
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
    if (status === 'error') {
        <div>
            <span>Url non valide</span>
        </div>
    }
    return (
        <div>
            <span>Votre compte a ete valide</span>
        </div>
    )
}

export default ActivateAccount