import { useStore } from "front/store/store"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const authStore = useStore((state) => state.authStore)

    if (authStore.authStatus === 'CHECKING') {
        return <div>Chargement...</div>
    }
    if (authStore.authStatus === 'CHECKED' && authStore.isLogged) {
        return <Navigate to="/" />
    }
    return children
}

export default PrivateRoute