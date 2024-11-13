import { css } from "styled-system/css"
import { modalStyle } from "./modal.style"
import { IoCloseSharp } from "react-icons/io5";
import { useStore } from "front/store/store";
import { makeReportRequest } from "front/api/profile";
import { AlertTypeEnum } from "front/typing/alert";

const ReportModal = () => {
  const slotsStyles = modalStyle.raw()
  const { user: loggedUser, token } = useStore((state) => state.authStore)
  const addAlert = useStore((state) => state.addAlert)
  const { userToReportId } = useStore((state) => state.modalState)
  const closeModal = useStore((state) => state.closeModal)

  const onReport = async () => {
    const ret = await makeReportRequest({
      token,
      addAlert,
      id: userToReportId
    })

    if (ret) {
      addAlert({message: 'Votre report à été envoyer', type: AlertTypeEnum.SUCCESS})
      onClose()
    }

  }

  const onClose = () => {
    closeModal('report')
  }

  return (
    <div className={css(slotsStyles.modalContainer)}>
      <div className={css(slotsStyles.modalContentWrapper)}>
        <h2 className={css(slotsStyles.modalTitle)}> Report </h2>
        <span> Voulez-vous vraiment signaler cet utilisateur ? </span>
        <div className={css(slotsStyles.buttonsContainer)}>
          <button className={css(slotsStyles.button)} onClick={onClose}> Annuler </button>
          <button className={css(slotsStyles.button)} onClick={onReport}> Valider </button>
        </div>
        <IoCloseSharp className={css(slotsStyles.closeIcon)} onClick={onClose} />
      </div>
    </div>
  )
}

export default ReportModal