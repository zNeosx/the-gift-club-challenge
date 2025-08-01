import { zodResolver } from '@hookform/resolvers/zod';
import { Dangerous } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { FormProvider, useForm } from 'react-hook-form';
import type { CampaignFormData } from '../../../lib/validations/campaign.schema';
import { campaignSchema } from '../../../lib/validations/campaign.schema';
import { useCampaignStore } from '../../../stores/campaign.store';
import { usePinCodeStore } from '../../../stores/pin_code.store';
import PinCodeAlert from '../../alerts/PinCodeAlert';
import CampaignActions from '../../campaign/CampaignActions';
import CampaignGifts from '../../campaign/CampaignGifts';
import CampaignGameCustomization from '../../campaign/CampaignGameCustomization';
import CampaignGames from '../../campaign/CampaignGames';
import CampaignGiftsConditions from '../../campaign/CampaignGiftsConditions';
import { ProfileSelector } from '../../campaign/ProfileSelector';
import SectionHeader from '../../common/section-header';
import PageContainer from '../../PageContainer';
import PageHeader from '../../PageHeader';
import { Alert, AlertTitle } from '../../ui/AlertCustom';

const CampaignConfigurationForm = () => {
  const { pinCode } = usePinCodeStore();

  const { campaign, mergeCampaign } = useCampaignStore();

  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      profile: campaign.profile ?? 'BASIC',
      configuration: {
        actions: campaign.configuration.actions ?? [
          {
            id: nanoid(),
            priority: 0,
            target: 'https://google.com/fr',
            type: 'GOOGLE_REVIEW',
          },
        ],
        colors: { primary: '#3f5efb', secondary: '#F59000' },
        disabled: campaign.configuration.disabled ?? true,
        game_type: campaign.configuration.game_type ?? 'WHEEL',
        gifts: campaign.configuration.gifts ?? [],
        retrievalConditions: campaign.configuration.retrievalConditions ?? [],
        logo_uri: campaign.configuration.logo_uri ?? '',
        conditionsType: campaign.configuration.conditionsType ?? 'NONE',
      },
      enabled: true,
      label: 'New Campaign',
      placeId: 'default-place-id',
    },
  });

  const {
    handleSubmit,
    getValues,
    setError,

    formState,
    clearErrors,
  } = methods;

  const onSubmit = (data: CampaignFormData) => {
    const actions = data.configuration.actions;

    const types = actions.map((a) => a.type);
    const hasDuplicates = new Set(types).size !== types.length;

    if (hasDuplicates) {
      setError('configuration.actions', {
        type: 'manual',
        message: 'Les actions doivent être uniques',
      });
      return;
    }

    const gifts = getValues('configuration.gifts');
    const isWinningGame = getValues('configuration.disabled');

    if (isWinningGame) {
      const hasUnlimited = gifts.some((g) => g.limit === -1);
      if (!hasUnlimited) {
        setError('configuration.gifts', {
          type: 'manual',
          message: 'Ajoutez au moins un gain avec un stock illimité.',
        });
        return;
      }
    } else {
      const hasLoss = gifts.some((g) => g.type === 'LOSS');
      if (!hasLoss) {
        setError('configuration.gifts', {
          type: 'manual',
          message: 'Ajoutez au moins un gain de type perte.',
        });
        return;
      }
    }

    clearErrors('configuration.gifts');

    mergeCampaign(data);
    alert('Votre campagne a bien été sauvegardée.');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessages = (errObj: any): string[] => {
    if (!errObj) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.values(errObj).flatMap((val: any) =>
      val?.message
        ? [val.message]
        : typeof val === 'object'
        ? getErrorMessages(val)
        : []
    );
  };

  const allErrors = getErrorMessages(formState.errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader onCampaignSave={() => methods.handleSubmit(onSubmit)()} />
        <PageContainer paddingY={8}>
          {allErrors.length > 0 &&
            allErrors.map((error, idx) => (
              <Alert variant="error" sx={{ marginBottom: 3 }} key={idx}>
                <AlertTitle
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Dangerous sx={{ width: '20px', height: '20px' }} />
                  <Typography component={'span'} sx={{ fontSize: '14px' }}>
                    {error}
                  </Typography>
                </AlertTitle>
              </Alert>
            ))}
          {!pinCode ? <PinCodeAlert sxProps={{ marginBottom: 8 }} /> : null}
          <ProfileSelector />
          <section>
            <SectionHeader
              title="Organisez vos actions"
              subtitle={`Définissez l'ordre et les actions à réaliser par vos clients pour maximiser l'engagement.`}
            />
            <CampaignActions />
          </section>
          <Divider component="li" sx={{ marginY: 6 }} />
          <section>
            <SectionHeader
              title="Choix du jeu"
              subtitle={`Sélectionnez parmi 4 jeux interactifs pour engager vos utilisateurs et créer une expérience unique.`}
            />
            <CampaignGames />
          </section>
          <Divider component="li" sx={{ marginY: 6 }} />
          <section>
            <SectionHeader
              title="Personnalisez votre jeu"
              subtitle={`Importer votre logo et sélectionnez vos couleurs pour créer un jeu à l'image de votre marque. offrez à vos clients une expérience unique, entièrement personnalisée`}
            />
            <CampaignGameCustomization fileUploaderInputName="configuration.logo_uri" />
          </section>
          <Divider component="li" sx={{ marginY: 6 }} />
          <section>
            <SectionHeader
              title="Ajoutez et configurez vos gains"
              subtitle={`Indiquez les récompenses que vos clients pourront gagner. Offrez des cadeaux attractifs pour augmenter leur engagement et leur fidélité.`}
            />
            <CampaignGifts />
          </section>
          <Divider component="li" sx={{ marginY: 6 }} />
          <section>
            <SectionHeader
              title="Définissez les conditions pour récupérer les cadeaux"
              subtitle={`Paramétrez si vos clients doivent remplir une condition (ex: montant minimum d'achat) pour pouvoir repartir avec leur cadeau.`}
            />
            <CampaignGiftsConditions />
          </section>
        </PageContainer>
      </form>
    </FormProvider>
  );
};

export default CampaignConfigurationForm;
