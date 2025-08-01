import { Stack, Switch } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';
import { ModalType, useModalStore } from '../../stores/modal.store';
import type { Conditions } from '../../types';
import ToggleOption from '../common/ToggleOption';
import CampaignGiftsConditionsTable from './CampaignGiftsConditionsTable';

const CampaignGiftsConditions = () => {
  const { openModal } = useModalStore();

  const { control, watch, getValues } = useFormContext<CampaignFormData>();

  const {
    append: appendCondition,
    update: updateCondition,
    remove: removeCondition,
  } = useFieldArray<CampaignFormData, 'configuration.retrievalConditions'>({
    control,
    name: 'configuration.retrievalConditions',
  });

  const handleAddCondition = useCallback(
    (giftId: string) => {
      openModal(ModalType.ADD_EDIT_CONDITION, {
        action: 'ADD',
        appendCondition,
        giftId,
      });
    },
    [openModal, appendCondition]
  );

  const handleEditCondition = useCallback(
    (index: number, condition: Conditions) => {
      openModal(ModalType.ADD_EDIT_CONDITION, {
        action: 'EDIT',
        updateCondition,
        condition,
        index,
      });
    },
    [openModal, updateCondition]
  );

  const handleRemoveCondition = useCallback(
    (index: number) => {
      removeCondition(index);
    },
    [removeCondition]
  );

  const configurationType = watch('configuration.conditionsType');
  return (
    <Stack spacing={{ xs: 6, md: 2 }}>
      <Stack sx={{ flexDirection: { md: 'row' }, alignItems: 'start', gap: 6 }}>
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
        handleEditCondition={handleEditCondition}
        handleAddCondition={handleAddCondition}
        handleRemoveCondition={handleRemoveCondition}
      />
    </Stack>
  );
};

export default CampaignGiftsConditions;
