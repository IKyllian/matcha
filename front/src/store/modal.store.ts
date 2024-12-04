import { StoreSetType } from "front/typing/store"

export type ModalType = 'report'

const defaultModals: {
  modals: Record<ModalType, boolean>,
  userToReportId?: number
} = {
  modals: {
    report: false
  }
}

export type ModalStoreType = {
  modalState: {
    modals: Record<ModalType, boolean>,
    userToReportId?: number
  }
  openModal: ({ modalKey, userToReportId }: { modalKey: ModalType, userToReportId: number }) => void,
  closeModal: (modalKey: ModalType) => void
}

export const modalSlice = (set: StoreSetType): ModalStoreType => ({
  modalState: defaultModals,
  openModal: ({ modalKey, userToReportId }: { modalKey: ModalType, userToReportId: number }) => set((state) => ({ ...state, modalState: { ...state.modalState, modals: { ...state.modalState, [modalKey]: true }, userToReportId } })),
  closeModal: (modalKey: ModalType) => set((state) => ({ ...state, modalState: { ...state.modalState, modals: { ...state.modalState, [modalKey]: false }, userToReportId: false } }))
})