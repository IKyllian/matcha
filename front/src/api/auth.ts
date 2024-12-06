import { NotificationType } from "front/typing/notification";
import { User } from "front/typing/user";
import ky from "ky";
import { apiRequest } from "./api";
import { AlertStoreType } from "front/store/alert.store";

export const makeAuthRequest = async (token: string, addAlert: AlertStoreType['addAlert']) => {
    return apiRequest<{ user: User, notifications: NotificationType[] }>({
        url: `${import.meta.env.VITE_API_URL}/auth?jwt_token=${token}`,
        options: {
            method: 'GET',
        },
        addAlert
    });
}

export const makeIpAddressRequest = async () => {
    const response = await ky.get<{ ip?: string }>('https://api.ipify.org?format=json').json()
    return response
}

export const makeActivateAccountRequest = async ({ url_identifier, addAlert }: { url_identifier: string, addAlert: AlertStoreType['addAlert'] }) => {
    return apiRequest<{ ok?: true }>({
        url: `${import.meta.env.VITE_API_URL}/activateAccount`,
        options: {
            method: 'POST',
            json: { url_identifier }
        },
        addAlert
    });
}

export const makeResetPasswordRequest = async ({ data, addAlert }: { data: { url_identifier: string, pass: string }, addAlert: AlertStoreType['addAlert'] }) => {
    return apiRequest<{ ok: true }>({
        url: `${import.meta.env.VITE_API_URL}/resetPassword`,
        options: {
            method: 'PATCH',
            json: { ...data }
        },
        addAlert
    })
}

export const makeSendResetPasswordEmailRequest = async ({ email, addAlert }: { email: string, addAlert: AlertStoreType['addAlert'] }) => {
    return apiRequest<{ ok: true }>({
        url: `${import.meta.env.VITE_API_URL}/sendPasswordReset`,
        options: {
            method: 'POST',
            json: { email }
        },
        addAlert
    })
}