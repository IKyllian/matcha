import { NotificationType } from "front/typing/notification"

export type NotificationStoreType = {
  notifications: NotificationType[],
  addNotification: (notification: NotificationType) => void,
}

const defaultNotifications: NotificationType[] = []

export const notificationsSlice = (set): NotificationStoreType => ({
  notifications: defaultNotifications,
  addNotification: (notification: NotificationType) => set((state) => ({ ...state, notifications: [...state.notifications, notification] }))
})