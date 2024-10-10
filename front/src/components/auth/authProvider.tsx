import { makeAuthRequest } from "front/api/auth";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { useStore } from "front/store/socketMidlleware.store";
import { ReactNode, useEffect } from "react"
import { useCookies } from "react-cookie";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [cookies] = useCookies([]);
    const logUser = useStore((state) => state.logUser)
    const setAuthStatus = useStore((state) => state.setAuthStatus)

    useEffect(() => {
        const authRequest = async () => {
            const cookie = cookies[COOKIE_JWT_TOKEN]
            console.info("COOKIE = ", cookie)
            if (cookie) {
                const { user } = await makeAuthRequest(cookie)
                if (user) {
                    logUser(user)
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