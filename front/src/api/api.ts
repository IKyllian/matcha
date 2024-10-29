import ky from "ky";

export const makeApi = ({ token, contentType }: { token: string, contentType?: string }) => {
    return ky.extend({
        hooks: {
            beforeRequest: [
                (request) => {
                    request.headers.set('Authorization', `Bearer ${token})}`);
                    request.headers.set('Content-Type', contentType ? contentType : 'application/json')
                }
            ]
        }
    })
}
