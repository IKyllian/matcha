import { NotificationType } from "front/typing/notification";
import { User } from "front/typing/user";
import ky from "ky";
import { apiRequest } from "./api";

export const makeAuthRequest = async (token: string) => {
    const response = await ky.get<{ user: User, notifications: NotificationType[] }>(`${import.meta.env.VITE_API_URL}/auth?jwt_token=${token}`).json();
    return response
}

export const makeIpAddressRequest = async () => {
    const response = await ky.get<{ ip?: string }>('https://api.ipify.org?format=json').json()
    return response
}

export const makeActivateAccountRequest = async ({ url_identifier }: { url_identifier: string }) => {
    return apiRequest<{ ok: true }>({
        url: `${import.meta.env.VITE_API_URL}/activateAccount`,
        options: {
            method: 'POST',
            json: { url_identifier }
        },
    });
}

export const makeResetPasswordRequest = async ({ data }: { data: { url_identifier: string, pass: string } }) => {
    return apiRequest<{ ok: true }>({
        url: `${import.meta.env.VITE_API_URL}/resetPassword`,
        options: {
            method: 'PATCH',
            json: { ...data }
        },
    })
}

export const makeSendResetPasswordEmailRequest = async ({ email }) => {
    return apiRequest<{ ok: true }>({
        url: `${import.meta.env.VITE_API_URL}/sendResetPassword`,
        options: {
            method: 'POST',
            json: { email }
        },
    })
}