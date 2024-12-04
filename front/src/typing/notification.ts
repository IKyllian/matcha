import { User } from "./user"

export enum NotificationTypeEnum {
  NEW_MESSAGE,
  NEW_MATCH,
  LIKE,

}

export type NotificationType = {
  id: number
  type: NotificationTypeEnum
  content: string
  sender: Pick<User, 'id' | 'images' | 'username'>
  receiver: Pick<User, 'id' | 'images' | 'username'>
  was_seen: boolean
  created_at: Date
}
