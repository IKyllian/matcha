import { User, USERS } from "./user"

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

export const NOTIFICATIONS: NotificationType[] = [
  {
    id: 1,
    type: NotificationTypeEnum.NEW_MESSAGE,
    sender: {
      id: USERS[1].id,
      img: USERS[1].img,
      username: USERS[1].username,
    },
    createdAt: new Date
  },
  {
    id: 2,
    type: NotificationTypeEnum.NEW_MATCH,
    sender: {
      id: USERS[2].id,
      img: USERS[2].img,
      username: USERS[2].username,
    },
    createdAt: new Date
  },
  {
    id: 2,
    type: NotificationTypeEnum.NEW_MATCH,
    sender: {
      id: USERS[2].id,
      img: USERS[2].img,
      username: USERS[2].username,
    },
    createdAt: new Date
  },
  {
    id: 2,
    type: NotificationTypeEnum.NEW_MATCH,
    sender: {
      id: USERS[2].id,
      img: USERS[2].img,
      username: USERS[2].username,
    },
    createdAt: new Date
  },
  {
    id: 2,
    type: NotificationTypeEnum.NEW_MATCH,
    sender: {
      id: USERS[2].id,
      img: USERS[2].img,
      username: USERS[2].username,
    },
    createdAt: new Date
  },
]