import { notificationsScreenStyle } from "./notificationScreen.style"
import { FaTrash } from "react-icons/fa";
import { css } from "styled-system/css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "front/hook/useApi";
import { makeDeleteAllNotificationRequest, makeDeleteNotificationRequest, makeViewNotificationRequest } from "front/api/notification";
import { useStore } from "front/store/store";
import { NotificationType, NotificationTypeEnum } from "front/typing/notification";
import ProfilePicture from "front/components/utils/profilePicture";

const NotificationScreen = () => {
  const slotsStyles = notificationsScreenStyle.raw()
  const { token } = useStore(state => state.authStore)
  const unseeNitifications = useStore(state => state.unseeNitifications)
  const deleteNotificationById = useStore(state => state.deleteNotificationById)
  const deleteAllNotification = useStore(state => state.deleteAllNotification)
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<NotificationType[]>()
  const {
    isLoading
  } = useApi({
    endpoint: 'notifications',
    setter: setNotifications,
    key: 'notifications',
  })

  useEffect(() => {
    const makeRequest = async () => {
      const ret = await makeViewNotificationRequest({ token })
      if (ret) {
        unseeNitifications()
      }
    }
    if (!isLoading && notifications && notifications.find(n => !n.was_seen)) {
      makeRequest()
    }
  }, [isLoading, notifications])

  const onNotifclick = (senderId: number, notif_type: NotificationTypeEnum) => {
    if (notif_type === NotificationTypeEnum.NEW_MESSAGE) {
      navigate(`/chat/${senderId}`)
    } else {
      navigate(`/profile/${senderId}`)
    }
  }

  const onNotifDelete = async (notifId: number) => {
    const ret = await makeDeleteNotificationRequest({
      token, id: notifId
    })
    if (ret) {
      setNotifications(prev => [...prev.filter(n => n.id !== notifId)])
      deleteNotificationById(notifId)
    }
  }

  const onAllDelete = async () => {
    const ret = await makeDeleteAllNotificationRequest({ token })
    if (ret) {
      setNotifications([])
      deleteAllNotification()
    }
  }

  if (isLoading) {
    return (<p>Loading...</p>)
  }

  return (
    <div className={css(slotsStyles.screenContainer)}>
      <h1 className={css(slotsStyles.title)}> Notifications </h1>
      {
        notifications?.length > 0 ? (
          <>
            <div className={css(slotsStyles.buttonContainer)}>
              <button className={css(slotsStyles.button)} onClick={onAllDelete}> Clear all </button>
            </div>
            <div className={css(slotsStyles.notificationContainer)}>
              {
                notifications?.map((notification, index) => (
                  <div key={index} className={css(slotsStyles.notificationItem)}>
                    <ProfilePicture onClick={() => onNotifclick(notification.sender.id, notification.notif_type)} userImages={notification.sender.images} className={slotsStyles.imgSender} width="52px" height="52px" />
                    <span>{notification.content}</span>
                    <FaTrash onClick={() => onNotifDelete(notification.id)} />
                  </div>
                ))
              }
            </div>
          </>) : (
          <span>Vous n'avez pas de notifications pour le moment</span>
        )
      }

    </div>
  )
}

export default NotificationScreen