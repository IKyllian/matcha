import { API_URL } from "front/hook/useApi";
import { User } from "front/typing/user";
import { apiRequest } from "./api";
import { AlertStoreType } from "front/store/alert.store";

type SignProps = {
    data: Pick<User, 'username' | 'password'>
    addAlert: AlertStoreType['addAlert']
}
export const makeSignInRequest = async ({ data, addAlert }: SignProps): Promise<{ user: User; access_token: string } | null> => {
    return apiRequest<{ user: User; access_token: string }>({
        url: `${API_URL}/signin`,
        options: {
            method: 'POST',
            json: data
        },
        addAlert
    });
};

export const makeSignUpRequest = async ({ data, addAlert }: SignProps): Promise<{ user: User; access_token: string } | null> => {
    return apiRequest<{ user: User; access_token: string }>({
        url: `${API_URL}/signup`,
        options: {
            method: 'POST',
            json: data
        },
        addAlert
    });
};