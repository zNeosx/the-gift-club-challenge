import { create } from 'zustand';

export const ModalType = {
  NULL: 'null',
  PIN_CODE: 'PIN_CODE',
  QR_CODE: 'QR_CODE',
  SAVE_CAMPAIGN: 'SAVE_CAMPAIGN',
  CONFIGURE_PIN_CODE: 'CONFIGURE_PIN_CODE',
  ADD_ACTION: 'ADD_ACTION',
  ADD_GIFT: 'ADD_GIFT',
  EDIT_GIFT: 'EDIT_GIFT',
  ADD_EDIT_CONDITION: 'ADD_EDIT_CONDITION',
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalProps = Record<string, any>;

interface ModalStore {
  currentModal: ModalType;
  modalProps: ModalProps;
  openModal: (type: ModalType, props?: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentModal: ModalType.NULL,
  modalProps: {},
  openModal: (type, props = {}) =>
    set({ currentModal: type, modalProps: props }),
  closeModal: () => set({ currentModal: ModalType.NULL, modalProps: {} }),
}));
