import { NotificationType } from "front/typing/notification"
import { StoreSetType } from "front/typing/store"

export type NotificationStoreType = {
  notifications: NotificationType[],
  addNotification: (notification: NotificationType) => void,
  deleteNotificationById: (notiId: number) => void,
  deleteAllNotification: () => void,
  unseeNitifications: () => void,
  setNotifications: (notifications: NotificationType[]) => void
}

const defaultNotifications: NotificationType[] = []

export const notificationsSlice = (set: StoreSetType): NotificationStoreType => ({
  notifications: defaultNotifications,
  addNotification: (notification: NotificationType) => set((state) => ({ ...state, notifications: [...state.notifications, notification] })),
  deleteNotificationById: (notifId: number) => set((state) => ({ ...state, notifications: [...state.notifications.filter(n => n.id !== notifId)] })),
  unseeNitifications: () => set((state) => ({ ...state, notifications: [...state.notifications.map(n => n.was_seen ? n : { ...n, was_seen: true })] })),
  deleteAllNotification: () => set((state) => ({ ...state, notifications: [] })),
  setNotifications: (notifications: NotificationType[]) => set((state) => ({ ...state, notifications: [...notifications] }))
})