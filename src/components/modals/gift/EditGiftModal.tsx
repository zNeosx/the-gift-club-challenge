import { Box, Modal } from '@mui/material';
import { modalStyle } from '../../../lib/modal.utils';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import EditGiftForm from '../../forms/gift/EditGiftForm';

const EditGiftModal = () => {
  const { currentModal, closeModal, modalProps } = useModalStore();
  const isOpen = currentModal === ModalType.EDIT_GIFT;

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <EditGiftForm
          editGift={modalProps.update}
          gift={modalProps.gift}
          index={modalProps.index}
        />
      </Box>
    </Modal>
  );
};

export default EditGiftModal;
