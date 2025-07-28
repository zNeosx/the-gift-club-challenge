import { modalStyle } from '../../../lib/modal.utils';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import { Box, Modal, Typography } from '@mui/material';

const QrCodeModal = () => {
  const { currentModal, closeModal } = useModalStore();
  const isOpen = currentModal === ModalType.QR_CODE;

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          QR CODE MODAL
        </Typography>
      </Box>
    </Modal>
  );
};

export default QrCodeModal;
