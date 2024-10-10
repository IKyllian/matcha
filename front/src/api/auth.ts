import { API_URL } from "front/hook/useApi";
import { User } from "front/typing/user";
import ky from "ky";

export const makeAuthRequest = async (token: string) => {
    const response = await ky.post<{ user: User }>(`${API_URL}/auth`, { json: { token } }).json();
    console.info('AUTH RESPONSE = ', response)
    return response
}