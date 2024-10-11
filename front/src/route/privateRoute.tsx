import Header from "front/components/header/header"
import { useStore } from "front/store/store"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const authStore = useStore((state) => state.authStore)

    if (authStore.authStatus === 'CHECKING') {
        return <div>Chargement...</div>
    }
    if (authStore.authStatus === 'CHECKED' && !authStore.isLogged) {
        return <Navigate to="/signin" />
    }
    return (
        <div>
            <Header />
            <div style={{ marginTop: '70px' }}>
                {children}
            </div>
        </div>
    )
}

export default PrivateRoute