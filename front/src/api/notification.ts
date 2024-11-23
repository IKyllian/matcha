import { RequestProps } from "front/typing/api";
import { apiRequest } from "./api";

export const makeDeleteNotificationRequest = async ({ token, id }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/deleteNotification/${id}`,
        options: {
            method: 'DELETE',
        },
        token,
    });
}

export const makeDeleteAllNotificationRequest = async ({ token }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/deleteAllNotifications`,
        options: {
            method: 'DELETE',
        },
        token,
    });
}

export const makeViewNotificationRequest = async ({ token }: RequestProps) => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/seeNotifications`,
        options: {
            method: 'PATCH',
        },
        token,
    });
}