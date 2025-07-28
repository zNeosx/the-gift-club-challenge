import { useFormContext } from 'react-hook-form';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';
import { Stack, Typography } from '@mui/material';

export function ProfileSelector() {
  const { register } = useFormContext<CampaignFormData>();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', marginBottom: 4 }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <input type="radio" value="BASIC" {...register('profile')} />
        <Typography>Basic</Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <input type="radio" value="PREMIUM" {...register('profile')} />
        <Typography>Premium</Typography>
      </Stack>
    </Stack>
  );
}
