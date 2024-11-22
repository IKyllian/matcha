import { AlertStoreType } from "front/store/alert.store"

export type RequestProps = {
    token: string,
    id?: number,
    addAlert?: AlertStoreType['addAlert']
}