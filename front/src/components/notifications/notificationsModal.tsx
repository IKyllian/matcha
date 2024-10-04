import { css } from "styled-system/css"
import { notificationsModalStyle } from "./notificationsModal.style"
import { NotificationType, NotificationTypeEnum } from "front/typing/notification"
import { USERS } from "front/typing/user"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const NOTIFICATIONS: NotificationType[] = [
  {
    id: 1,
    type: NotificationTypeEnum.NEW_MESSAGE,
    sender: {
      userId: USERS[1].id,
      img: USERS[1].img,
      username: USERS[1].username,
    },
    createdAt: new Date
  },
  {
    id: 2,
    type: NotificationTypeEnum.NEW_MATCH,
    sender: {
      userId: USERS[2].id,
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
  const modalRef = useRef<HTMLDivElement>();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  };

  const onDelete = (notifId: number) => {
    console.info('notifId = ', notifId)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className={css(slotsStyles.modalContainer)} ref={modalRef}>
      { NOTIFICATIONS.length && <span style={{textAlign: 'center'}}> Pas de notifications </span> }
      { !NOTIFICATIONS.length &&
        <>
          {
            NOTIFICATIONS.map(notif => (
              <div className={css(slotsStyles.notifItem)}>
                <img className={css(slotsStyles.imgSender)} src={notif.sender.img} alt='image de profil' />
                <span> {getMessageByNotificationType(notif)} </span>
                <FaTrash className={css(slotsStyles.deleteIcon)} onClick={() => onDelete(notif.id)} />
              </div>
            ))
          }
          < Link className={css(slotsStyles.link)} to=''> All notifications </Link>
        </>
      }
    </div >
  )
}

export default NotificationsModal