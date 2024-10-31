export interface AlertType {
    id: number,
    message: string,
    type: AlertTypeEnum,
}

export enum AlertTypeEnum {
    ERROR,
    SUCCESS,
    WARNING
}

export type HTTPResponseType<T> = T | {
    error: {
        message: string
        code?: number
    }
}