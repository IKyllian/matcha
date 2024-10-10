import { API_URL } from "front/hook/useApi";
import { User } from "front/typing/user";
import ky from "ky";

export const makeSignInRequest = async (data: Pick<User, 'username' | 'password'>) => {
    const response = await ky.post<{ user: User, access_token: string }>(`${API_URL}/signin`, { json: { ...data } }).json();
    console.info('SIGNIN RESPONSE = ', response)
    return response
}

export const makeSignUpRequest = async (data: Pick<User, 'username' | 'password'>) => {
    const response = await ky.post<{ user: User, access_token: string }>(`${API_URL}/signin`, { json: { ...data } }).json();
    console.info('SIGNUP RESPONSE = ', response)
    return response
}