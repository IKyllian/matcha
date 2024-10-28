import { API_URL } from "front/hook/useApi";
import { makeApi } from "front/api/api";

export const makeLikeRequest = async ({ token, id }: { token: string, id: number }) => {
    const api = makeApi(token)
    const response = await api.post<{ ok: boolean }>(`${API_URL}/like`, { json: { user_to_like_id: id } }).json();
    return response
}

export const makeBlockRequest = async ({ token, id }: { token: string, id: number }) => {
    const api = makeApi(token)
    const response = await api.post<{ ok: boolean }>(`${API_URL}/block`, { json: { user_to_block_id: id } }).json();
    return response
}