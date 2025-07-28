import { MoreHoriz, QrCode } from '@mui/icons-material';
import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { ModalType, useModalStore } from '../stores/modal.store';
import MobileMenu from './MobileMenu';
import PageContainer from './PageContainer';
import LogoImg from '../assets/logo.png';

type Props = {
  onCampaignSave: () => void;
};

const PageHeader = ({ onCampaignSave }: Props) => {
  const { openModal } = useModalStore();

  return (
    <header>
      <PageContainer
        borderBottom={1}
        borderColor={'lightGray'}
        paddingY={4}
        sx={{ backgroundColor: '#FAFAFA' }}
      >
        <Stack
          justifyContent={'space-between'}
          alignContent={'center'}
          direction={'row'}
        >
          <Box
            component="img"
            src={LogoImg}
            alt="Ma Campagne"
            sx={{
              width: { xs: 200, sm: 300, md: 500 },
              height: 'auto',
              flexShrink: 0,
            }}
          />

          <Stack
            direction={'row'}
            useFlexGap
            display={{ xs: 'none', lg: 'flex' }}
            flexWrap={'wrap'}
            alignSelf={'center'}
            spacing={2}
            height={'32px'}
          >
            <Button
              variant="outlined"
              sx={{
                display: { xs: 'none', lg: 'block' },
                borderLeft: 10,
                textTransform: 'capitalize',
                borderColor: 'lightgray',
                borderLeftColor: 'purple',
                color: 'inherit',
              }}
              onClick={() => openModal(ModalType.PIN_CODE)}
            >
              <Typography variant="body2" component={'span'}>
                Mon code PIN
              </Typography>
            </Button>

            <Button
              variant="contained"
              size="small"
              startIcon={<QrCode />}
              sx={{
                bgcolor: 'secondary.main',
                boxShadow: 'none',
                textTransform: 'capitalize',
              }}
              onClick={() => openModal(ModalType.QR_CODE)}
            >
              <Typography variant="body2" component={'span'}>
                QR Code
              </Typography>
            </Button>

            <Button
              variant="contained"
              sx={{ boxShadow: 'none' }}
              onClick={onCampaignSave}
            >
              <Typography variant="body2" component={'span'}>
                Sauvegarder
              </Typography>
            </Button>

            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'lightgray',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.25),
                },
              }}
            >
              <MoreHoriz />
            </Button>
          </Stack>

          <MobileMenu onCampaignSave={onCampaignSave} />
        </Stack>
      </PageContainer>
    </header>
  );
};

export default PageHeader;
