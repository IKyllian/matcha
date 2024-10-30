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
