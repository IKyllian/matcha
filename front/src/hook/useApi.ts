import { makeApi } from "front/api/api";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { CHAT_DATA, CHAT_SIDEBAR, ChatType } from "front/typing/chat";
import { Tags, User, USERS } from "front/typing/user";
import ky from "ky";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export type UrlParamsType = {
    minAge?: number,
    maxAge?: number,
    minPos?: number,
    maxPos?: number,
    minFame?: number,
    maxFame?: number,
    tags?: Tags[]
}

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
        if (value) {
            if (+index !== 0) {
                stringParams += "&"
            }
            if (Array.isArray(value)) {
                stringParams += `${key}=${value.toString()}`
            } else {
                stringParams += `${key}=${value}`
            }
        }
    }

    return stringParams
}

export const API_URL = 'http://10.11.11.1:3000';

// -------------------------- Until we have an api -------------------------------------------------------//
export type EndpointType = 'chat' | 'profile' | 'sidebar' | 'getLikesOfUser';
const getUserById = (userId: number): User | undefined => USERS.find(user => user.id === userId);
const getChatById = (chatId: number): ChatType | undefined => CHAT_DATA.find(chat => chat.id === chatId);
const getDataFromEndpoint = ({ endpoint, params }: { endpoint: EndpointType, params?: { id: number } }) => {
    switch (endpoint) {
        case 'chat':
            return getChatById(params?.id);
        case 'profile':
            return getUserById(params?.id);
        case 'sidebar':
            return CHAT_SIDEBAR;
        default:
            return undefined;
    }
}

const getUlrParams = ({ urlParams, endpoint, params }: { endpoint: string, urlParams?: UrlParamsType, params?: { id: number } }) => {
    if (urlParams) {
        return `${API_URL}/${endpoint}${buildUrlParams(urlParams)}`
    } else if (params) {
        return `${API_URL}/${endpoint}/${params.id}`
    }
    return `${API_URL}/${endpoint}`
}
//--------------------------------------------------------------------------------------------------------//

export const useApi = <T>({ endpoint, params, urlParams, dependencies = [], setter, key }: UseApiProps<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        const fetch = async () => {
            try {
                const cookie = cookies[COOKIE_JWT_TOKEN]
                if (!cookie) {
                    throw new Error("No JWT token found")
                }
                const api = makeApi(cookie)
                const requestparams = getUlrParams({ endpoint, params, urlParams })
                const response = await api.get<T>(requestparams).json();
                // const response = getDataFromEndpoint({ endpoint, params }) as T
                console.info("REPONSE = ", response)
                setter(key ? response[key] : response)
            } catch (err) {
                console.error(err);
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