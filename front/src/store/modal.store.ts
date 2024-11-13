export type ModalType = 'report'

const defaultModals: Record<ModalType, boolean> = {
  report: false
}

export type ModalStoreType = {
    modals: Record<ModalType, boolean>
    changeModalStatus: (modalKey: ModalType) => void,
}

export const modalSlice = (set): ModalStoreType => ({
    modals: defaultModals,
    changeModalStatus: (modalKey: ModalType) => set((state) => ({ ...state, modals: {...state.modals, [modalKey]: !state.modals[modalKey]} })),

})