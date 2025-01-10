import Alert from "front/components/alert/alert"
import Banner from "front/components/banner/banner"
import Header from "front/components/header/header"
import NavBar from "front/components/header/navbar"
import ReportModal from "front/components/modals/reportModal"
import { useStore } from "front/store/store"
import { AlertTypeEnum } from "front/typing/alert"
import { isUserProfileComplete } from "front/utils/user.utils"
import { Navigate, useLocation } from "react-router-dom"
import { css } from "styled-system/css"

const PrivateRoute = ({ children }) => {
    const authStore = useStore((state) => state.authStore)
    const { modals } = useStore((state) => state.modalState)
    const isProfileComplete = isUserProfileComplete(authStore.user)
    const location = useLocation()
    const showBanner = !isProfileComplete && location.pathname !== '/settings'
    const addAlert = useStore((state) => state.addAlert)
    // console.info("location in private route = ", location)

    if (authStore.authStatus === 'CHECKING') {
        return <div>Chargement...</div>
    }
    if (authStore.authStatus === 'CHECKED' && !authStore.isLogged) {
        return <Navigate to="/login" />
    }

    if (authStore.authStatus === 'CHECKED' && authStore.isLogged && !authStore.user?.is_valid && location.pathname !== '/settings') {
        // addAlert({ type: AlertTypeEnum.ERROR, message: 'Vous devez completez votre compte pour acceder au site' })
        return <Navigate to="/settings" state={{ ...location.state }} />
    }

    return (
        <div>
            <Header />
            <div className={
                css({
                    marginTop: showBanner ? '130px' : '70px',
                    width: '100%',
                    mdDown: {
                        marginTop: showBanner ? '50px' : '0'
                    },
                    smDown: {
                        marginTop: showBanner ? '80px' : '0'
                    }
                })
            }>
                {showBanner && <Banner />}
                {modals.report && <ReportModal />}
                <Alert />
                {children}
                <NavBar />
            </div>
        </div>
    )
}

export default PrivateRoute