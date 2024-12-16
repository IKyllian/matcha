import { COOKIE_JWT_TOKEN } from "front/constant/cookie"
import { useStore } from "front/store/store"
import { useCookies } from "react-cookie"

export const useLogout = () => {
    const logoutUser = useStore((state) => state.logoutUser)
    const resetChat = useStore((state) => state.resetChat)
    const resetChatSidebar = useStore((state) => state.resetChatSidebar)
    const deleteAllNotification = useStore((state) => state.deleteAllNotification)
    const closeModal = useStore((state) => state.closeModal)
    const socketDisconnect = useStore((state) => state.socketDisconnect)
    const [cookies, setCookie, removeCookie] = useCookies();

    const onLogout = () => {
        removeCookie(COOKIE_JWT_TOKEN)
        resetChat()
        resetChatSidebar()
        deleteAllNotification()
        closeModal('report')
        socketDisconnect()
        logoutUser()
    }

    return { onLogout }
}