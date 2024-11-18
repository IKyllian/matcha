import Alert from "front/components/alert/alert"
import { useStore } from "front/store/store"
import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
    const authStore = useStore((state) => state.authStore)

    if (authStore.authStatus === 'CHECKING') {
        return <div>Chargement...</div>
    }
    if (authStore.authStatus === 'CHECKED' && authStore.isLogged) {
        return <Navigate to="/" />
    }
    return (
        <>
            {children}
            <Alert />
        </>
    )
}

export default PublicRoute