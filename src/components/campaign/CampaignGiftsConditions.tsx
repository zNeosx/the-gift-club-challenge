import { Stack, Switch } from '@mui/material';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';
import { Controller, useFormContext } from 'react-hook-form';
import ToggleOption from '../common/ToggleOption';
import CampaignGiftsConditionsTable from './CampaignGiftsConditionsTable';

const CampaignGiftsConditions = () => {
  const { control, watch, getValues } = useFormContext<CampaignFormData>();

  const configurationType = watch('configuration.conditionsType');
  return (
    <Stack spacing={2}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'start', gap: 6 }}>
        <ToggleOption
          label="Pas de condition"
          description="Les clients peuvent récupérer leur gain sans aucun achat."
          borderColor={configurationType === 'NONE' ? 'secondary.main' : 'gray'}
        />
        <Controller
          name={'configuration.conditionsType'}
          control={control}
          render={({ field }) => (
            <Switch
              color="secondary"
              checked={field.value === 'NONE' ? false : true}
              onChange={(_, checked) => {
                if (checked) {
                  field.onChange('CUSTOM');
                } else {
                  field.onChange('NONE');
                }
              }}
            />
          )}
        />
        <ToggleOption
          label={`Sous condition d'achat minimale`}
          description={`Exigez un montant minmum d'achat en boutique pour permettre la récupération du gain.`}
          borderColor={
            configurationType === 'CUSTOM' ? 'secondary.main' : 'gray'
          }
        />
      </Stack>

      <CampaignGiftsConditionsTable
        gifts={getValues('configuration.gifts')}
        conditions={getValues('configuration.retrievalConditions')}
      />
    </Stack>
  );
};

export default CampaignGiftsConditions;
