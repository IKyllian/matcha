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