import { AlertStoreType } from "front/store/alert.store";
import { AlertTypeEnum } from "front/typing/alert";
import ky from "ky";

export const makeApi = ({ token }: { token?: string }) => {
    return ky.extend({
        hooks: {
            beforeRequest: token ? [
                (request) => {
                    request.headers.set('Authorization', `Bearer ${token})}`);
                }
            ] : []
        }
    })
}

type ApiRequestProps = {
    url: string
    options: Record<string, any>
    token?: string
    addAlert?: AlertStoreType['addAlert']
}
export const apiRequest = async <T>({ token, url, options, addAlert }: ApiRequestProps): Promise<T | null> => {
    try {
        const kyInstance = makeApi({ token })
        const response = await kyInstance(url, options).json<T>();
        return response;
    } catch (error) {
        if (addAlert) {
            addAlert({ message: error.message, type: AlertTypeEnum.ERROR });
        }
        console.error('API Error:', error);
        return null;
    }
};