import { User } from "./user"

export enum NotificationTypeEnum {
  NEW_MESSAGE,
  NEW_MATCH,
  LIKE,

}

export type NotificationType = {
  id: number
  type: NotificationTypeEnum
  sender: Pick<User, 'id' | 'img' | 'username'>
  createdAt: Date
}