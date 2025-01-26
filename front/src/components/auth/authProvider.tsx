import { makeAuthRequest } from "front/api/auth";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { useLogout } from "front/hook/useLogout";
import { useStore } from "front/store/store";
import { ReactNode, useEffect } from "react"
import { useCookies } from "react-cookie";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const logUser = useStore((state) => state.logUser)
    const setNotifications = useStore((state) => state.setNotifications)
    const setAuthStatus = useStore((state) => state.setAuthStatus)
    const initSocket = useStore((state) => state.initSocket)
    const addAlert = useStore((state) => state.addAlert)
    const { onLogout } = useLogout()

    useEffect(() => {
        const authRequest = async () => {
            const cookie = cookies[COOKIE_JWT_TOKEN]
            if (cookie) {
                try {
                    const ret = await makeAuthRequest(cookie, addAlert)
                    if (ret) {
                        const { user, notifications } = ret
                        logUser(user, cookie)
                        initSocket({ token: cookie })
                        if (notifications) {
                            setNotifications(notifications)
                        }
                    } else {
                        onLogout()
                    }
                } catch (e) {
                    console.error("Error auth request: ", e)
                    setAuthStatus('CHECKED')
                }
            } else {
                setAuthStatus('CHECKED')
            }
        }
        authRequest()
    }, [])
    return children
}

export default AuthProvider