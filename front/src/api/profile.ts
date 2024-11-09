import { API_URL } from "front/hook/useApi";
import { apiRequest } from "front/api/api";

export const makeLikeRequest = async ({ token, id }: { token: string, id: number }) => {
    return apiRequest<{ ok: boolean }>({
        url: `${API_URL}/like`,
        options: {
            method: 'POST',
            json: { user_to_like_id: id }
        },
        token
    });
}

export const makeBlockRequest = async ({ token, id }: { token: string, id: number }) => {
    return apiRequest<{ ok: boolean }>({
        url: `${API_URL}/block`,
        options: {
            method: 'POST',
            json: { user_to_block_id: id }
        },
        token
    });
}

export const makeViewRequest = async ({ token, id }: { token: string, id: number }) => {
    return apiRequest<{ ok: boolean }>({
        url: `${API_URL}/view`,
        options: {
            method: 'POST',
            json: { user_to_view_id: id }
        },
        token
    });
}

export const makeSettingsRequest = async (data: any, token: string) => {
    return apiRequest<{ ok: boolean }>({
        url: `${API_URL}/profile/setSettings`,
        options: {
            method: 'POST',
            json: { body: data }
        },
        token
    });
}