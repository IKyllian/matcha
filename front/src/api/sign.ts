import { User } from "front/typing/user";
import { apiRequest } from "./api";
import { AlertStoreType } from "front/store/alert.store";
import { NotificationType } from "front/typing/notification";

type SignProps = {
    data: Pick<User, 'username' | 'password'>
    addAlert: AlertStoreType['addAlert']
    ip?: string
}

type SignInResponseType = {
    user: User
    access_token: string
    notifications: NotificationType[]
}

export const makeSignInRequest = async ({ data, addAlert }: SignProps): Promise<SignInResponseType | null> => {
    return apiRequest<SignInResponseType>({
        url: `${import.meta.env.VITE_API_URL}/signin`,
        options: {
            method: 'POST',
            json: data
        },
        addAlert
    });
};

export const makeSignUpRequest = async ({ data, addAlert, ip }: SignProps): Promise<{ ok: boolean } | null> => {
    return apiRequest<{ ok: boolean }>({
        url: `${import.meta.env.VITE_API_URL}/signup`,
        options: {
            method: 'POST',
            json: data
        },
        addAlert,
        ip
    });
};