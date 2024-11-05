import { AlertStoreType } from "front/store/alert.store";
import { AlertTypeEnum } from "front/typing/alert";
import ky from "ky";

export const makeApi = ({ token }: { token: string }) => {
    return ky.extend({
        hooks: {
            beforeRequest: [
                (request) => {
                    request.headers.set('Authorization', `Bearer ${token})}`);
                }
            ]
        }
    })
}

type ApiRequestProps = {
    url: string
    options: Record<string, any>
    addAlert: AlertStoreType['addAlert']
}
export const apiRequest = async <T>({ url, options, addAlert }: ApiRequestProps): Promise<T | null> => {
    try {
        const response = await ky(url, options).json<T>();
        return response;
    } catch (error) {
        addAlert({ message: error.message, type: AlertTypeEnum.ERROR });
        console.error('API Error:', error);
        return null;
    }
};