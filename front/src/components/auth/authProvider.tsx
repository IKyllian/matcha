import { makeAuthRequest } from "front/api/auth";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { useStore } from "front/store/store";
import { ReactNode, useEffect } from "react"
import { useCookies } from "react-cookie";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const logUser = useStore((state) => state.logUser)
    const logoutUser = useStore((state) => state.logoutUser)
    const setNotifications = useStore((state) => state.setNotifications)
    const setAuthStatus = useStore((state) => state.setAuthStatus)
    const initSocket = useStore((state) => state.initSocket)
    const addAlert = useStore((state) => state.addAlert)
    const resetChat = useStore((state) => state.resetChat)
    const resetChatSidebar = useStore((state) => state.resetChatSidebar)
    const deleteAllNotification = useStore((state) => state.deleteAllNotification)
    const closeModal = useStore((state) => state.closeModal)
    const socketDisconnect = useStore((state) => state.socketDisconnect)

    useEffect(() => {
        const authRequest = async () => {
            const cookie = cookies[COOKIE_JWT_TOKEN]
            console.info("COOKIE = ", cookie)
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
                        removeCookie(COOKIE_JWT_TOKEN)
                        resetChat()
                        resetChatSidebar()
                        deleteAllNotification()
                        closeModal('report')
                        socketDisconnect()
                        logoutUser()
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