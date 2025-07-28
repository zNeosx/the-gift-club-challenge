import { modalStyle } from '../../../lib/modal.utils';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import { Box, Modal, Typography } from '@mui/material';
import { usePinCodeStore } from '../../../stores/pin_code.store';

const PinCodeModal = () => {
  const { currentModal, closeModal } = useModalStore();
  const { pinCode } = usePinCodeStore();
  const isOpen = currentModal === ModalType.PIN_CODE;

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          CODE PIN MODAL
        </Typography>
        <Typography id="modal-modal-content" component="p" sx={{ mt: 2 }}>
          {pinCode
            ? `Mon code PIN : ${pinCode}`
            : `Votre code pin n'est pas encore configuré`}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PinCodeModal;
