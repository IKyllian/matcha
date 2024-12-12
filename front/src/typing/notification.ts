import { User } from "./user"

export enum NotificationTypeEnum {
  NEW_MESSAGE,
  LIKE,
  NEW_MATCH,
  VIEW
}

export type NotificationType = {
  id: number
  notif_type: NotificationTypeEnum
  content: string
  sender: Pick<User, 'id' | 'images' | 'username'>
  receiver: Pick<User, 'id' | 'images' | 'username'>
  was_seen: boolean
  created_at: Date
}
