import { CHAT_DATA, CHAT_SIDEBAR, ChatType } from "front/typing/chat";
import { User, USERS } from "front/typing/user";
import ky from "ky";
import { useEffect, useState } from "react"

type UseApiProps<T> = {
    endpoint: EndpointType,
    // method?: string,
    params?: { id: number },
    dependencies?: any[],
    setter: (entity: T ) => void,
}

const API_URL = 'localhost:3000/';

// -------------------------- Until we have an api -------------------------------------------------------//
export type EndpointType = 'chat' | 'profile' | 'sidebar';
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
//--------------------------------------------------------------------------------------------------------//

export const useApi = <T>({ endpoint, params, dependencies = [], setter }: UseApiProps<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                // const response = await ky.get<T>(`${API_URL}${endpoint}`, {json: params}).json();
                const response = getDataFromEndpoint({ endpoint, params }) as T
                setter(response)
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