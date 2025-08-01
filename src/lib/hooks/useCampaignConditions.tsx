import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CampaignFormData } from '../validations/campaign.schema';

const useCampaignConditions = () => {
  const { control } = useFormContext<CampaignFormData>();

  const {
    fields,
    append: appendCondition,
    update: updateCondition,
    remove: removeCondition,
  } = useFieldArray<CampaignFormData, 'configuration.retrievalConditions'>({
    control,
    name: 'configuration.retrievalConditions',
  });

  return {
    fields,
    appendCondition,
    updateCondition,
    removeCondition,
  };
};

export default useCampaignConditions;
