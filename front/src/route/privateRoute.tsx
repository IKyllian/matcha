import Banner from "front/components/banner/banner"
import Header from "front/components/header/header"
import { useStore } from "front/store/store"
import { isUserProfileComplete } from "front/utils/user.utils"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const authStore = useStore((state) => state.authStore)
    const isProfileComplete = isUserProfileComplete(authStore.user)
    const location = useLocation()
    const showBanner = !isProfileComplete && !location.pathname

    if (authStore.authStatus === 'CHECKING') {
        return <div>Chargement...</div>
    }
    if (authStore.authStatus === 'CHECKED' && !authStore.isLogged) {
        return <Navigate to="/signin" />
    }
    return (
        <div>
            <Header />
            <div style={{ marginTop: showBanner ? '130px' : '70px', display: 'inline-block', width: '100%' }}>
                { showBanner && <Banner />}
                {children}
            </div>
        </div>
    )
}

export default PrivateRoute