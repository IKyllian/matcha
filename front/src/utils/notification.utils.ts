import { NotificationType, NotificationTypeEnum } from "front/typing/notification"

export const getMessageByNotificationType = (notif: NotificationType) => {
  switch (notif.type) {
    case NotificationTypeEnum.NEW_MESSAGE:
      return `${notif.sender.username} vous a envoyé un message`
    case NotificationTypeEnum.NEW_MATCH:
      return `${notif.sender.username} vous a matché`
    default:
      return 'Notification inconnue'
  }
}