import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CampaignFormData } from '../validations/campaign.schema';
import useCampaignConditions from './useCampaignConditions';

const useCampaignGifts = () => {
  const { control } = useFormContext<CampaignFormData>();

  const {
    fields,
    append: appendGift,
    remove: removeGift,
    update: updateGift,
  } = useFieldArray<CampaignFormData, 'configuration.gifts'>({
    control,
    name: 'configuration.gifts',
  });

  const { removeCondition } = useCampaignConditions();

  const removeGiftWithCondition = useCallback(
    (index: number) => {
      removeGift(index);
      removeCondition(index);
    },
    [removeGift, removeCondition]
  );

  return {
    fields,
    appendGift,
    updateGift,
    removeGiftWithCondition,
  };
};

export default useCampaignGifts;
