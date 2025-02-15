import { useStore } from "front/store/store"
import { modalStyle } from "./modal.style"
import { css } from "styled-system/css"
import { IoCloseSharp } from "react-icons/io5"
import { deleteAccountRequest } from "front/api/profile"
import { useLogout } from "front/hook/useLogout"
import { AlertTypeEnum } from "front/typing/alert"

const DeleteAccountModal = () => {
  const slotsStyles = modalStyle.raw()
  const { user: loggedUser, token } = useStore((state) => state.authStore)
  const closeModal = useStore((state) => state.closeModal)
  const addAlert = useStore((state) => state.addAlert)
  const { onLogout } = useLogout()
  const onDelete = async () => {
    const ret = await deleteAccountRequest({user_id_to_delete: loggedUser.id, token, addAlert})
    if (ret?.ok) {
      addAlert({type: AlertTypeEnum.SUCCESS, message: 'Votre compte a été supprimer'})
      onLogout()
    }
  }
  const onClose = () => {
    closeModal('deleteAccount')
  }
  return (
      <div className={css(slotsStyles.modalContainer)}>
        <div className={css(slotsStyles.modalContentWrapper)}>
          <h2 className={css(slotsStyles.modalTitle)}> Suppression </h2>
          <span> Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible. </span>
          <div className={css(slotsStyles.buttonsContainer)}>
            <button className={css(slotsStyles.button)} onClick={onClose}> Annuler </button>
            <button className={css(slotsStyles.button)} onClick={onDelete}> Valider </button>
          </div>
          <IoCloseSharp className={css(slotsStyles.closeIcon)} onClick={onClose} />
        </div>
      </div>
    )
}

export default DeleteAccountModal