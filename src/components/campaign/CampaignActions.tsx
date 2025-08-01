import { Warning } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useCampaignActions } from '../../lib/hooks/useCampaignActions';
import { ModalType, useModalStore } from '../../stores/modal.store';
import { Alert, AlertDescription, AlertTitle } from '../ui/AlertCustom';
import CampaignActionsTable from './CampaignActionsTable';

const CampaignActions = () => {
  const { openModal } = useModalStore();

  const {
    fields,
    insertAction,
    removeActionByPriority,
    hasDuplicateTypes,
    hasOnlyOneAction,
  } = useCampaignActions();

  const handleAddAction = useCallback(
    (priority: number) => {
      openModal(ModalType.ADD_ACTION, {
        insertAction,
        priority,
      });
    },
    [openModal, insertAction]
  );

  return (
    <Stack>
      <CampaignActionsTable
        fields={fields}
        handleAddAction={handleAddAction}
        handleRemoveAction={removeActionByPriority}
      />
      {hasOnlyOneAction && (
        <Alert variant="warning" sx={{ marginTop: 3 }}>
          <AlertTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Warning sx={{ width: '20px', height: '20px' }} />
            <Typography component={'span'} sx={{ fontSize: '14px' }}>
              Une seule action = une seule participation
            </Typography>
          </AlertTitle>
          <AlertDescription sx={{ fontSize: '14px' }}>
            Vos clients ne joueront qu'une seule fois si vous ne proposez qu'une
            seule action.
          </AlertDescription>
        </Alert>
      )}
      {hasDuplicateTypes && (
        <Alert variant="warning" sx={{ marginTop: 3 }}>
          <AlertTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Warning sx={{ width: '20px', height: '20px' }} />
            <Typography component={'span'} sx={{ fontSize: '14px' }}>
              Attention
            </Typography>
          </AlertTitle>
          <AlertDescription sx={{ fontSize: '14px' }}>
            Vous avez des actions en double dans votre tableau. Veuillez en
            supprimer ou modifier un.
          </AlertDescription>
        </Alert>
      )}
    </Stack>
  );
};

export default CampaignActions;
