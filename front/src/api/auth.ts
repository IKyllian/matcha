import { API_URL } from "front/hook/useApi";
import { User } from "front/typing/user";
import ky from "ky";

export const makeAuthRequest = async (token: string) => {
    const response = await ky.get<{ user: User }>(`${API_URL}/auth?jwt_token=${token}`).json();
    return response
}