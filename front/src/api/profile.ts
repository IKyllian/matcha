import { API_URL } from "front/hook/useApi";
import { makeApi } from "front/api/api";
import { SettingsDataType } from "front/typing/user";

export const makeLikeRequest = async ({ token, id }: { token: string, id: number }) => {
    const api = makeApi({ token })
    try {
        const response = await api.post<{ ok: boolean }>(`${API_URL}/like`, { json: { user_to_like_id: id } }).json();
        return response
    } catch (error) {
        console.info('Error = ', error)
        console.info('Error = ', error.message)
        console.info('Error = ', error.response)
        if (error.response) {
            const errorData = await error.response.json();
            console.info('Erreur:', errorData);
        } else {
            console.info('Erreur de réseau:', error.message);
        }
    }
}

export const makeBlockRequest = async ({ token, id }: { token: string, id: number }) => {
    const api = makeApi({ token })
    const response = await api.post<{ ok: boolean }>(`${API_URL}/block`, { json: { user_to_block_id: id } }).json();
    return response
}

export const makeViewRequest = async ({ token, id }: { token: string, id: number }) => {
    const api = makeApi({ token })
    const response = await api.post<{ ok: boolean }>(`${API_URL}/view`, { json: { user_to_view_id: id } }).json();
    return response
}

export const makeSettingsRequest = async (data: any, token: string) => {
    console.info('data = ', data)
    const api = makeApi({ token })
    const response = await api.post<{ ok: boolean }>(`${API_URL}/profile/setSettings`, { body: data }).json();
    return response
}