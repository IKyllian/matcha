import { css } from "styled-system/css"
import { notificationsModalStyle } from "./notificationsModal.style"
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useCloseRef from "front/hook/useCloseRef";
import { makeDeleteNotificationRequest, makeViewNotificationRequest } from "front/api/notification";
import { useStore } from "front/store/store";
import { useEffect } from "react";
import ProfilePicture from "front/components/utils/profilePicture";

type NotificationsModalProps = {
  onClose: () => void
}

const NotificationsModal = ({ onClose }: NotificationsModalProps) => {
  const slotsStyles = notificationsModalStyle.raw()
  const { token } = useStore(state => state.authStore)
  const notifications = useStore(state => state.notifications)
  const unseeNitifications = useStore(state => state.unseeNitifications)
  const deleteNotificationById = useStore(state => state.deleteNotificationById)
  const ref = useCloseRef({ onClose })
  const navigate = useNavigate()

  useEffect(() => {
    const makeRequest = async () => {
      const ret = await makeViewNotificationRequest({ token })
      if (ret) {
        unseeNitifications()
      }
    }
    if (notifications.find(n => !n.was_seen)) {
      makeRequest()
    }
  })

  const onNotifDelete = async (notifId: number) => {
    const ret = await makeDeleteNotificationRequest({
      token, id: notifId
    })
    if (ret) {
      deleteNotificationById(notifId)
    }
  }

  const onNotifclick = (senderId: number) => {
    onClose()
    navigate(`/profile/${senderId}`)
  }

  return (
    <div className={css(slotsStyles.modalContainer)} ref={ref}>
      {notifications.length === 0 && <span style={{ textAlign: 'center' }}> Pas de notifications </span>}
      {notifications.length > 0 &&
        <>
          {
            notifications.slice(0, 3).map(notif => (
              <div key={notif.id} className={css(slotsStyles.notifItem)}>
                <ProfilePicture userImages={notif.sender.images} height="24px" width="24px" onClick={() => onNotifclick(notif.sender.id)} className={slotsStyles.imgSender} />
                <span>{notif.content}</span>
                <FaTrash className={css(slotsStyles.deleteIcon)} onClick={() => onNotifDelete(notif.id)} />
              </div>
            ))
          }
          <Link className={css(slotsStyles.link)} to='/notifications' onClick={onClose}> All notifications </Link>
        </>
      }
    </div>
  )
}

export default NotificationsModal