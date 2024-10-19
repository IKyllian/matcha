import { getMessageByNotificationType } from "front/utils/notification.utils"
import { notificationsScreenStyle } from "./notificationScreen.style"
import { NOTIFICATIONS } from "front/typing/notification"
import { FaTrash } from "react-icons/fa";
import { css } from "styled-system/css";

const NotificationScreen = () => {
  const slotsStyles = notificationsScreenStyle.raw()
  return (
    <div className={css(slotsStyles.screenContainer)}>
      <h1 className={css(slotsStyles.title)}> Notifications </h1>
      <div className={css(slotsStyles.buttonContainer)}>
        <button className={css(slotsStyles.button)}> Clear all </button>
      </div>
      <div className={css(slotsStyles.notificationContainer)}>
        {
          NOTIFICATIONS.map((notification, index) => (
            <div key={index} className={css(slotsStyles.notificationItem)}>
              <img src={notification.sender.img} className={css(slotsStyles.imgSender)} />
              <span> {getMessageByNotificationType(notification)} </span>
              <FaTrash />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default NotificationScreen