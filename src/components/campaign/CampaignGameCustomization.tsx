import { Box, Grid, Stack } from '@mui/material';
import CustomTitle from '../common/CustomTitle';
import FileUpload from '../common/FileUpload';
import ColorCustomization from './ColorCustomization';

type Props = {
  fileUploaderInputName: string;
};
const CampaignGameCustomization = ({ fileUploaderInputName }: Props) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'lightgray',
        padding: 4,
        borderRadius: 1,
      }}
    >
      <Grid container spacing={{ xs: 6, lg: 16 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <CustomTitle title="Glissez-déposez votre logo" />
            <FileUpload name={fileUploaderInputName} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTitle title="Importez vos couleurs" />
          <ColorCustomization />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignGameCustomization;
