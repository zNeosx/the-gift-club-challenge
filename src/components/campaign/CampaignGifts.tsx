import { Add, LocalActivity } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useCampaignConditions from '../../lib/hooks/useCampaignConditions';
import useCampaignGifts from '../../lib/hooks/useCampaignGifts';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';
import { ModalType, useModalStore } from '../../stores/modal.store';
import type { Gift } from '../../types';
import ToggleOptionControlled from '../common/ToggleOptionControlled';
import { FormMessage } from '../ui/FormMessage';
import CampaignGiftsTable from './CampaignGiftsTable';

const CampaignGifts = () => {
  const { openModal } = useModalStore();
  const { control, setError, formState, clearErrors } =
    useFormContext<CampaignFormData>();

  const { fields, removeGiftWithCondition, appendGift, updateGift } =
    useCampaignGifts();

  const { appendCondition } = useCampaignConditions();

  const gifts = useWatch({
    control,
    name: 'configuration.gifts',
  });
  const isWinningGame = useWatch({
    control,
    name: 'configuration.disabled',
  });

  const lossAddedRef = useRef(false);

  useEffect(() => {
    if (isWinningGame) {
      const hasUnlimited = gifts.some((g) => g.limit === -1);

      if (!hasUnlimited) {
        setError('configuration.gifts', {
          type: 'manual',
          message: 'Ajoutez au moins un gain avec un stock illimité.',
        });
        return;
      }
      clearErrors('configuration.gifts');
    } else {
      const hasLoss = gifts.some((g) => g.type === 'LOSS');

      if (!hasLoss && !lossAddedRef.current) {
        appendGift({
          id: nanoid(),
          icon: '',
          name: 'Perte',
          type: 'LOSS',
          limit: 1,
          initial_limit: 1,
        });
        lossAddedRef.current = true;
        return;
      }
      clearErrors('configuration.gifts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWinningGame]);

  useEffect(() => {
    if (isWinningGame) {
      const hasUnlimited = gifts.some((g) => g.limit === -1);
      if (hasUnlimited) {
        clearErrors('configuration.gifts');
      } else {
        setError('configuration.gifts', {
          type: 'manual',
          message: 'Ajoutez au moins un gain avec un stock illimité.',
        });
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gifts]);

  const handleAddGift = useCallback(() => {
    openModal(ModalType.ADD_GIFT, { append: appendGift, appendCondition });
  }, [openModal, appendGift, appendCondition]);

  const handleEditGift = useCallback(
    (field: Gift, index: number) => {
      openModal(ModalType.EDIT_GIFT, {
        update: updateGift,
        gift: field,
        index,
      });
    },
    [openModal, updateGift]
  );

  return (
    <Stack spacing={2}>
      <ToggleOptionControlled
        control={control}
        name="configuration.disabled"
        borderColor="secondary.main"
        label="Jeu 100% Gagnant"
        description={`Cochez cette option pour garantir un gain à chaque joueur. Si vous la
        décochez, une case 'Perdu' sera automatiquement ajoutée au jeu.`}
      />
      <Stack sx={{ flexDirection: 'row' }}>
        <Stack sx={{ flexDirection: 'row', marginLeft: 'auto', gap: 2 }}>
          <Button
            variant="contained"
            endIcon={<LocalActivity />}
            sx={{
              bgcolor: 'secondary.main',
            }}
          >
            <Typography
              variant="body1"
              sx={{ textTransform: 'initial' }}
              component={'span'}
            >
              Tirage au sort
            </Typography>
          </Button>
          <Button variant="contained" endIcon={<Add />} onClick={handleAddGift}>
            <Typography
              variant="body1"
              sx={{ textTransform: 'initial' }}
              component={'span'}
            >
              Ajouter un gain
            </Typography>
          </Button>
        </Stack>
      </Stack>

      {/* GIFTS ERRORS */}
      {formState.errors.configuration?.gifts ? (
        <FormMessage message={formState.errors.configuration?.gifts.message} />
      ) : null}

      {/* GIFTS TABLE */}
      <CampaignGiftsTable
        fields={fields}
        handleAddGift={handleAddGift}
        handleEditGift={handleEditGift}
        handleRemoveGift={removeGiftWithCondition}
      />
    </Stack>
  );
};

export default React.memo(CampaignGifts);
