import { useStore } from "front/store/store";
import { AlertType, AlertTypeEnum } from "front/typing/alert";
import { useEffect, useState } from "react";
import { IoIosWarning, IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { alertStyle } from "./alert.style";
import { css } from "styled-system/css";
import { SystemStyleObject } from "styled-system/types";
import { MdError } from "react-icons/md";

type AlertItemProps = {
    alert: AlertType
}
const AlertItem = ({ alert }: AlertItemProps) => {
    const removeAlert = useStore(store => store.removeAlert)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined)
    const slotsStyles = alertStyle.raw()

    const closeSuccess = (id: number) => {
        clearTimeout(timeoutId);
        removeAlert(id);
    }

    const getClass = (type: AlertTypeEnum): SystemStyleObject => {
        if (type === AlertTypeEnum.ERROR)
            return slotsStyles.notifError;
        else if (type === AlertTypeEnum.SUCCESS)
            return slotsStyles.notifSuccess;
        return slotsStyles.notifWarning;
    }

    useEffect(() => {
        setTimeoutId(setTimeout(() => {
            removeAlert(alert.id);
        }, 5000));

        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    return (
        <div key={alert.id} className={css(slotsStyles.notifWrapper, getClass(alert.type))}>
            <div className={css(slotsStyles.notifContentContainer)}>
                <div className={css(slotsStyles.iconWrapper)}>
                    {alert.type === AlertTypeEnum.SUCCESS && <FaCheck className={css(slotsStyles.iconSuccess)} />}
                    {alert.type === AlertTypeEnum.ERROR && <MdError className={css(slotsStyles.iconError)} />}
                    {alert.type === AlertTypeEnum.WARNING && <IoIosWarning className={css(slotsStyles.iconWarning)} />}
                </div>
                <p> {alert.message} </p>
                <IoMdClose className={css(slotsStyles.closeIcon)} onClick={() => closeSuccess(alert.id)} />
            </div>
        </div>
    );
}

const Alert = () => {
    const alerts = useStore(store => store.alerts)
    const slotsStyles = alertStyle.raw()
    console.info("ALERTS IN ALERT COMP = ", alerts)

    return alerts.length > 0 ? (
        <div className={css(slotsStyles.notifContainer)}>
            {
                alerts.map(alert =>
                    <AlertItem key={alert.id} alert={alert} />
                )
            }
        </div>
    ) : (
        <> </>
    );
}

export default Alert;