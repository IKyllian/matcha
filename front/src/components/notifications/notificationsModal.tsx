import { css } from "styled-system/css"
import { notificationsModalStyle } from "./notificationsModal.style"
import { NotificationType, NotificationTypeEnum } from "front/typing/notification"
import { USERS } from "front/typing/user"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import useCloseRef from "front/hook/useCloseRef";

const NOTIFICATIONS: NotificationType[] = [
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
  }
]

const getMessageByNotificationType = (notif: NotificationType) => {
  switch (notif.type) {
    case NotificationTypeEnum.NEW_MESSAGE:
      return `${notif.sender.username} vous a envoyé un message`
    case NotificationTypeEnum.NEW_MATCH:
      return `${notif.sender.username} vous a matché`
    default:
      return 'Notification inconnue'
  }
}

type NotificationsModalProps = {
  onClose: () => void
}

const NotificationsModal = ({ onClose }: NotificationsModalProps) => {
  const slotsStyles = notificationsModalStyle.raw()
  const ref = useCloseRef({ onClose })

  const onDelete = (notifId: number) => {
    console.info('notifId = ', notifId)
  }

  return (
    <div className={css(slotsStyles.modalContainer)} ref={ref}>
      {!NOTIFICATIONS.length && <span style={{ textAlign: 'center' }}> Pas de notifications </span>}
      {NOTIFICATIONS.length &&
        <>
          {
            NOTIFICATIONS.map(notif => (
              <div key={notif.id} className={css(slotsStyles.notifItem)}>
                <img className={css(slotsStyles.imgSender)} src={notif.sender.img} alt='image de profil' />
                <span> {getMessageByNotificationType(notif)} </span>
                <FaTrash className={css(slotsStyles.deleteIcon)} onClick={() => onDelete(notif.id)} />
              </div>
            ))
          }
          <Link className={css(slotsStyles.link)} to=''> All notifications </Link>
        </>
      }
    </div>
  )
}

export default NotificationsModal