import { css } from "styled-system/css"
import { modalStyle } from "./modal.style"
import { IoCloseSharp } from "react-icons/io5";
import { useStore } from "front/store/store";

const ReportModal = () => {
  const slotsStyles = modalStyle.raw()
  const changeModalStatus = useStore((state) => state.changeModalStatus)

  return (
    <div className={css(slotsStyles.modalContainer)}>
      <div className={css(slotsStyles.modalContentWrapper)}>
          <h2 className={css(slotsStyles.modalTitle)}> Report </h2>
          <span> Voulez-vous vraiment signaler cet utilisateur ? </span>
          <div className={css(slotsStyles.buttonsContainer)}>
            <button className={css(slotsStyles.button)}> Annuler </button>
            <button className={css(slotsStyles.button)}> Valider </button>
          </div>
          <IoCloseSharp className={css(slotsStyles.closeIcon)} onClick={() => changeModalStatus('report')} />
      </div>
    </div>
  )
}

export default ReportModal