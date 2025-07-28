import { Stack, Switch, Typography } from '@mui/material';
import { useCampaignStore } from '../../stores/campaign.store';

const SwitchProfileType = () => {
  const { campaign, updateProfile } = useCampaignStore();

  const isChecked = campaign.profile !== 'BASIC' ? true : false;
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', marginBottom: 4 }}
    >
      <Typography>Basic</Typography>
      <Switch
        aria-label="profile type"
        checked={isChecked}
        onChange={(_, checked) => {
          if (checked) {
            updateProfile('PREMIUM');
          } else {
            updateProfile('BASIC');
          }
        }}
      />
      <Typography>Premium</Typography>
    </Stack>
  );
};

export default SwitchProfileType;
