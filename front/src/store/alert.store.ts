import { AlertType, AlertTypeEnum } from "front/typing/alert"

export type AlertStoreType = {
    alerts: AlertType[]
    addAlert: ({ message, type }: { message: string, type: AlertTypeEnum }) => void
    removeAlert: (id: number) => void
}

const defaultAlerts: AlertType[] = [
    {
        id: 1,
        message: 'Success Alert',
        type: AlertTypeEnum.SUCCESS
    },
    {
        id: 2,
        message: 'Warning Alert',
        type: AlertTypeEnum.WARNING
    },
    {
        id: 3,
        message: 'Success Error',
        type: AlertTypeEnum.ERROR
    },
]

export const alertSlice = (set): AlertStoreType => ({
    alerts: [],
    addAlert: ({ message, type }: { message: string, type: AlertTypeEnum }) => set((state) => {
        const newAlert = { message, type, id: Date.now() };
        const updatedAlerts = [newAlert, ...state.alerts].slice(0, 3); // Limite le tableau à trois éléments pour ne pas avoir trop de notifs afficher
        return { ...state, alerts: updatedAlerts };
    }),
    removeAlert: (id: number) => set((state) => ({ ...state, alerts: [...state.alerts.filter(elem => elem.id !== id)] })),
})