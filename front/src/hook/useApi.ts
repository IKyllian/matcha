import { makeApi } from "front/api/api";
import { COOKIE_JWT_TOKEN } from "front/constant/cookie";
import { UrlParamsType } from "front/typing/filters";
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
        if (value) {
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

export type EndpointType = 'chat' | 'profile' | 'sidebar' | 'getLikesOfUser' | 'getViewsOfUser' | 'getMatchesOfUser' | 'profile/settings' | 'getTags';

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
    const [cookies, setCookie, removeCookie] = useCookies();

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