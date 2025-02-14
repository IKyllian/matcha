import { apiRequest } from "front/api/api";
import { AlertStoreType } from "front/store/alert.store";
import { RequestProps } from "front/typing/api";
import { Tags, User } from "front/typing/user";
import ky from "ky";

export const makeLikeRequest = async ({ token, id, addAlert }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/like`,
        options: {
            method: 'POST',
            json: { user_to_like_id: id }
        },
        token,
        addAlert
    });
}

export const makeBlockRequest = async ({ token, id, addAlert }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/block`,
        options: {
            method: 'POST',
            json: { user_to_block_id: id }
        },
        token,
        addAlert
    });
}

export const makeReportRequest = async ({ token, id, addAlert }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/report`,
        options: {
            method: 'POST',
            json: { user_to_report_id: id }
        },
        token,
        addAlert
    });
}

export const makeViewRequest = async ({ token, id, addAlert }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/view`,
        options: {
            method: 'POST',
            json: { user_to_view_id: id }
        },
        token,
        addAlert
    });
}

export const makeSettingsRequest = async ({ data, token, addAlert, ip }: { data: any, token: string, addAlert: AlertStoreType['addAlert'], ip?: string }) => {
    return apiRequest<{ user: User }>({
        url: `${import.meta.env.VITE_API_URL}/profile/setSettings`,
        options: {
            method: 'POST',
            body: data
        },
        token,
        addAlert,
        ip
    });
}

export const makeTagsCreateRequest = async ({ tag_name, token, addAlert }: { tag_name: string, token: string, addAlert: AlertStoreType['addAlert'] }) => {
    return apiRequest<{ tag: Tags }>({
        url: `${import.meta.env.VITE_API_URL}/createTag`,
        options: {
            method: 'POST',
            json: { tag_name }
        },
        token,
        addAlert
    })
}

export const deleteAccountRequest = async ({ user_id_to_delete, token, addAlert }: {user_id_to_delete: number, token: string, addAlert: AlertStoreType['addAlert']}) => {
    return apiRequest<{ok: boolean}>({
        url: `${import.meta.env.VITE_API_URL}/profile/delete`,
        options: {
            method: 'DELETE',
            json: { user_id_to_delete }
        },
        token,
        addAlert
    })
}

export const makePositionRequest = async ({ city }) => {
    try {
        const response = await ky.get<any>(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`).json()
        return response
    } catch (e) {
       console.error('Error = ', e)
    }
}

export const makeReversePositionRequest = async ({ lat, lon }: { lat: number, lon: number }) => {
    try {
        const response = await ky.get<any>(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=10&format=jsonv2`).json()
        return response
    } catch (e) {
        console.error('Error = ', e)
    }
}
