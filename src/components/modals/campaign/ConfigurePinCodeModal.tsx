import { Box, Button, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { modalStyle } from '../../../lib/modal.utils';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import { usePinCodeStore } from '../../../stores/pin_code.store';

const ConfigurePinCodeModal = () => {
  const { currentModal, closeModal } = useModalStore();
  const { setPinCode } = usePinCodeStore();
  const isOpen = currentModal === ModalType.CONFIGURE_PIN_CODE;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setPinCode(data.pinCode);
    alert('Votre code pin a bien été configuré.');
    closeModal();
  };

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
          CODE PIN MODAL
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="tel"
            maxLength={8}
            {...register('pinCode', {
              required: true,
              maxLength: {
                value: 6,
                message: 'Le code pin doit contenir 6 chiffres',
              },
            })}
          />

          {typeof errors.pinCode?.message === 'string' && (
            <span>{errors.pinCode.message}</span>
          )}

          <Button type="submit">Configurer</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ConfigurePinCodeModal;
