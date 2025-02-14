import { AlertStoreType } from "front/store/alert.store";
import { AlertTypeEnum } from "front/typing/alert";
import ky, { HTTPError } from "ky";

export const makeApi = ({ token }: { token?: string }) => {
    return ky.extend({
        credentials: 'include',
        hooks: {
            beforeRequest: [
                (request) => {
                    request.headers.set('Access-Control-Allow-Origin', 'true')
                    if (token) request.headers.set('Authorization', `Bearer ${token}`)
                }
            ]
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
        let errorMessage = 'An unknown error occurred';
        let codeError = 0
        if (error instanceof HTTPError && error.response) {
            try {
                const errorResponse = await error.response.json();
                errorMessage = errorResponse.message || errorMessage;
                codeError = errorResponse.code
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            }
        } else {
            errorMessage = error.message;
        }

        if (addAlert) {
            if (codeError === 413) {
                addAlert({ message: "Request too large", type: AlertTypeEnum.ERROR });
            } else {
                addAlert({ message: errorMessage, type: AlertTypeEnum.ERROR });
            }
        }
        return null;
    }
};