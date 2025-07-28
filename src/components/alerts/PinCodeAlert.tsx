import { LockOutline } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
  type SxProps,
} from '@mui/material';
import { ModalType, useModalStore } from '../../stores/modal.store';

type Props = {
  sxProps?: SxProps;
};
const PinCodeAlert = ({ sxProps }: Props) => {
  const { openModal } = useModalStore();
  return (
    <Alert
      variant="outlined"
      icon={false}
      sx={{
        backgroundColor: '#FFF2BF',
        paddingX: 4,
        paddingY: 4,
        borderRadius: '12px',
        borderWidth: '2px',
        borderColor: '#FFCC00',
        ...sxProps,
      }}
    >
      <Stack
        direction={{ lg: 'row' }}
        sx={{ gap: 2 }}
        spacing={6}
        alignItems={'center'}
      >
        <Box
          sx={{
            backgroundColor: 'Background',
            borderRadius: '100%',
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LockOutline sx={{ color: '#FFCC00' }} />
        </Box>
        <Stack
          flexGrow={'inherit'}
          sx={{ textAlign: { xs: 'center', md: 'start' } }}
          spacing={1}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} component={'h2'}>
            Votre Code PIN n'est pas configuré
          </Typography>
          <Typography variant="body1" component={'p'}>
            Activez-le pour sécuriser la récupération des cadeaux par vos
            clients
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            boxShadow: 'none',
            backgroundColor: '#FFCC00',
            fontWeight: 'bold',
            color: 'ButtonText',
            justifySelf: 'end',
            alignContent: 'end',
          }}
          onClick={() => openModal(ModalType.CONFIGURE_PIN_CODE)}
        >
          Configurer mon code
        </Button>
      </Stack>
    </Alert>
  );
};

export default PinCodeAlert;
