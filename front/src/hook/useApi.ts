import { makeApi } from "front/api/api";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { useStore } from "front/store/store";
import { AlertTypeEnum } from "front/typing/alert";
import { UrlParamsType } from "front/typing/filters";
import { HTTPError } from "ky";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

type UseApiProps<T> = {
    endpoint: EndpointType,
    urlParams?: UrlParamsType,
    params?: { id: number },
    dependencies?: any[],
    setter: (entity: T) => void,
    key?: string
}

const buildUrlParams = (urlParams: UrlParamsType): string => {
    let stringParams: string = "?"
    const entries = Object.entries(urlParams)
    for (const [index, [key, value]] of Object.entries(entries)) {
        if (value || (typeof (value) === 'number' && value >= 0)) {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    if (+index !== 0) {
                        stringParams += "&"
                    }
                    stringParams += `${key}=${value.toString()}`
                }
            } else {
                if (+index !== 0) {
                    stringParams += "&"
                }
                stringParams += `${key}=${value}`
            }
        }
    }
    return stringParams
}

export type EndpointType = 'chat' | 'profile' | 'sidebar' | 'getLikesOfUser' | 'getViewsOfUser' | 'getMatchesOfUser' | 'profile/settings' | 'getTags' | 'getUserViews' | 'notifications' | 'getBlocksOfUser' | 'getChatList' | 'suggestion';

const getUlrParams = ({ urlParams, endpoint, params }: { endpoint: string, urlParams?: UrlParamsType, params?: { id: number } }) => {
    if (urlParams) {
        return `${import.meta.env.VITE_API_URL}/${endpoint}${buildUrlParams(urlParams)}`
    } else if (params) {
        return `${import.meta.env.VITE_API_URL}/${endpoint}/${params.id}`
    }
    return `${import.meta.env.VITE_API_URL}/${endpoint}`
}
//--------------------------------------------------------------------------------------------------------//

export const useApi = <T>({ endpoint, params, urlParams, dependencies = [], setter, key }: UseApiProps<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const addAlert = useStore((state) => state.addAlert)
    const [cookies, setCookie, removeCookie] = useCookies();
    const logoutUser = useStore((state) => state.logoutUser)
    const resetChat = useStore((state) => state.resetChat)
    const resetChatSidebar = useStore((state) => state.resetChatSidebar)
    const deleteAllNotification = useStore((state) => state.deleteAllNotification)
    const closeModal = useStore((state) => state.closeModal)
    const socketDisconnect = useStore((state) => state.socketDisconnect)

    useEffect(() => {
        const fetch = async () => {
            try {
                const cookie = cookies[COOKIE_JWT_TOKEN]
                if (!cookie) {
                    throw new Error("No JWT token found")
                }
                const api = makeApi({ token: cookie })
                const requestparams = getUlrParams({ endpoint, params, urlParams })
                const response = await api.get<T>(requestparams).json();
                console.info("REPONSE = ", requestparams, ' =>>>> ', response)
                setter(key ? response[key] : response)
            } catch (error) {
                let errorMessage = 'An unknown error occurred';
                let codeError = 0
                if (error instanceof HTTPError && error.response) {
                    try {
                        const errorResponse = await error.response.json();
                        codeError = errorResponse.code
                        errorMessage = errorResponse.message || errorMessage;
                    } catch (jsonError) {
                        console.error('Error parsing JSON:', jsonError);
                    }
                } else {
                    errorMessage = error.message;
                }
                addAlert({ message: errorMessage, type: AlertTypeEnum.ERROR });
                if (codeError && codeError === 401) {
                    console.error("AUTH Error -> diconnect")
                    removeCookie(COOKIE_JWT_TOKEN)
                    resetChat()
                    resetChatSidebar()
                    deleteAllNotification()
                    closeModal('report')
                    socketDisconnect()
                    logoutUser()
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (!isLoading) {
            setIsLoading(true);
        }
        fetch()
    }, dependencies)

    return {
        isLoading,
    }
}