import { css } from "styled-system/css"
import { notificationsModalStyle } from "./notificationsModal.style"
import { NOTIFICATIONS, NotificationType, NotificationTypeEnum } from "front/typing/notification"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCloseRef from "front/hook/useCloseRef";
import { getMessageByNotificationType } from "front/utils/notification.utils";

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
            NOTIFICATIONS.slice(0, 3).map(notif => (
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