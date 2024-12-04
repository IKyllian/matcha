import Alert from "front/components/alert/alert"
import Banner from "front/components/banner/banner"
import Header from "front/components/header/header"
import ReportModal from "front/components/modals/reportModal"
import { useStore } from "front/store/store"
import { isUserProfileComplete } from "front/utils/user.utils"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const authStore = useStore((state) => state.authStore)
    const { modals } = useStore((state) => state.modalState)
    const isProfileComplete = isUserProfileComplete(authStore.user)
    const location = useLocation()
    const showBanner = !isProfileComplete && location.pathname !== '/settings'

    if (authStore.authStatus === 'CHECKING') {
        return <div>Chargement...</div>
    }
    if (authStore.authStatus === 'CHECKED' && !authStore.isLogged) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Header />
            <div style={{ marginTop: showBanner ? '130px' : '70px', display: 'inline-block', width: '100%' }}>
                {showBanner && <Banner />}
                {modals.report && <ReportModal />}
                <Alert />
                {children}
            </div>
        </div>
    )
}

export default PrivateRoute