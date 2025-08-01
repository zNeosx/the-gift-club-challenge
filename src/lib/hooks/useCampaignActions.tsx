import { useCallback, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CampaignFormData } from '../validations/campaign.schema';

export const useCampaignActions = () => {
  const { control } = useFormContext<CampaignFormData>();

  const {
    fields,
    insert: insertAction,
    remove: removeAction,
  } = useFieldArray<CampaignFormData, 'configuration.actions'>({
    control,
    name: 'configuration.actions',
  });

  const removeActionByPriority = useCallback(
    (priority: number) => {
      const fieldIndex = fields.findIndex(
        (field) => field.priority === priority
      );
      if (fieldIndex !== -1) {
        removeAction(fieldIndex);
      }
    },
    [fields, removeAction]
  );

  const hasDuplicateTypes = useMemo(() => {
    const types = fields.map((f) => f.type).filter(Boolean);
    return new Set(types).size !== types.length;
  }, [fields]);

  return {
    fields,
    insertAction,
    removeActionByPriority,
    hasDuplicateTypes,
    hasOnlyOneAction: fields.length === 1,
  };
};
