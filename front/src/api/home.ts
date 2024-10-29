import { UrlParamsType } from "front/typing/filters";
import { makeApi } from "./api";
import { API_URL } from "front/hook/useApi";
import { User } from "front/typing/user";

export const makeFiltersRequest = async ({ data, token }: { data: UrlParamsType, token: string }) => {
    const api = makeApi({ token })
    const response = await api.get<{ list: Partial<User[]> }>(`${API_URL}/profile`, { json: { ...data } }).json();
    return response
}