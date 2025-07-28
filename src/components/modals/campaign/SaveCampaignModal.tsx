import { modalStyle } from '../../../lib/modal.utils';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import { Box, Modal, Typography } from '@mui/material';

const SaveCampaignModal = () => {
  const { currentModal, closeModal } = useModalStore();
  const isOpen = currentModal === ModalType.SAVE_CAMPAIGN;

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
          SAVE CAMPAIGN MODAL
        </Typography>
      </Box>
    </Modal>
  );
};

export default SaveCampaignModal;
