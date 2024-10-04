import { User } from "./user"

export enum NotificationTypeEnum {
  NEW_MESSAGE,
  NEW_MATCH,
  LIKE,

}

export type NotificationType = {
  id: number
  type: NotificationTypeEnum
  sender: {
    userId: User['id'],
    img: User['img'],
    username: User['username'],
  }
  createdAt: Date
}