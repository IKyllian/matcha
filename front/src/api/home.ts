import { UrlParamsType } from "front/typing/filters";
import { apiRequest } from "front/api/api";
import { API_URL } from "front/hook/useApi";
import { User } from "front/typing/user";

export const makeFiltersRequest = async ({ data, token }: { data: UrlParamsType, token: string }) => {
    return apiRequest<{ list: Partial<User[]> }>({
        url: `${API_URL}/profile`,
        options: {
            method: 'GET',
            json: { ...data }
        },
        token
    });
}