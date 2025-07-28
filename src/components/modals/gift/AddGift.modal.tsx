import { Box, Modal } from '@mui/material';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import AddGiftForm from '../../forms/gift/AddGift.form';
import { modalStyle } from '../../../lib/modal.utils';

const AddGiftModal = () => {
  const { currentModal, closeModal, modalProps } = useModalStore();
  const isOpen = currentModal === ModalType.ADD_GIFT;

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <AddGiftForm
          addGift={modalProps.append}
          addCondition={modalProps.appendCondition}
        />
      </Box>
    </Modal>
  );
};

export default AddGiftModal;
