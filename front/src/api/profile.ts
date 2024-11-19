import { apiRequest } from "front/api/api";
import { AlertStoreType } from "front/store/alert.store";

type RequestFromIdProps = {
    token: string,
    id: number,
    addAlert?: AlertStoreType['addAlert']
}

export const makeLikeRequest = async ({ token, id, addAlert }: RequestFromIdProps) => {
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

export const makeBlockRequest = async ({ token, id, addAlert }: RequestFromIdProps) => {
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

export const makeReportRequest = async ({ token, id, addAlert }: RequestFromIdProps) => {
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

export const makeViewRequest = async ({ token, id, addAlert }: RequestFromIdProps) => {
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
    return apiRequest<{ ok: boolean }>({
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

export const makePositionRequest = async ({ city }) => {
    return apiRequest({
        url: `https://nominatim.openstreetmap.org/search?city=${city}&format=json`,
        options: {
            method: 'GET',
        },
    });
}

export const makeReversePositionRequest = async ({ lat, lon }: { lat: number, lon: number }) => {
    return apiRequest<any>({
        url: `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=10&format=jsonv2`,
        options: {
            method: 'GET',
        },
    });
}