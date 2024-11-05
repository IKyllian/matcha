import { API_URL } from "front/hook/useApi";
import { HTTPResponseType } from "front/typing/alert";
import { User } from "front/typing/user";
import ky from "ky";
import { apiRequest } from "./api";
import { AlertStoreType } from "front/store/alert.store";

// export const makeSignInRequest = async (data: Pick<User, 'username' | 'password'>): Promise<HTTPResponseType<{ user: User; access_token: string; }>> => {
//     try {
//         const response = await ky.post<{ user: User, access_token: string }>(`${API_URL}/signin`, { json: { ...data } }).json();
//         console.info('SIGNIN RESPONSE = ', response)
//         return response
//     } catch (error) {
//         console.info('error = ', error)
//         return {
//             error: {
//                 message: 'Error in login form'
//             }
//         }
//     }

// }

// export const makeSignUpRequest = async (data: Pick<User, 'username' | 'password'>) => {
//     try {
//         const response = await ky.post<{ user: User, access_token: string }>(`${API_URL}/signup`, { json: { ...data } }).json();
//         console.info('SIGNUP RESPONSE = ', response)
//         return response
//     } catch (error) {
//         console.info('error = ', error)
//     }
// }

type SignProps = {
    data: Pick<User, 'username' | 'password'>
    addAlert: AlertStoreType['addAlert']
}
export const makeSignInRequest = async ({ data, addAlert }: SignProps): Promise<{ user: User; access_token: string } | null> => {
    return apiRequest<{ user: User; access_token: string }>({
        url: `${API_URL}/signin`, options: {
            method: 'POST',
            json: data
        }, addAlert
    });
};

export const makeSignUpRequest = async ({ data, addAlert }: SignProps): Promise<{ user: User; access_token: string } | null> => {
    return apiRequest<{ user: User; access_token: string }>({
        url: `${API_URL}/signup`, options: {
            method: 'POST',
            json: data
        }, addAlert
    });
};