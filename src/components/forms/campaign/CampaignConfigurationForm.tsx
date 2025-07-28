import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import type { CampaignFormData } from '../../../lib/validations/campaign.schema';
import { campaignSchema } from '../../../lib/validations/campaign.schema';
import { useCampaignStore } from '../../../stores/campaign.store';
import { usePinCodeStore } from '../../../stores/pin_code.store';
import PinCodeAlert from '../../alerts/PinCodeAlert';
import CampaignGames from '../../campaign/CampaignGames';
import CampaignGains from '../../campaign/CampaignGains';
import CampaignGameCustomization from '../../campaign/CampaignGameCustomization';
import { ProfileSelector } from '../../campaign/ProfileSelector';
import SectionHeader from '../../common/section-header';
import PageContainer from '../../PageContainer';
import PageHeader from '../../PageHeader';
import CampaignGiftsConditions from '../../campaign/CampaignGiftsConditions';

const CampaignConfigurationForm = () => {
  const { pinCode } = usePinCodeStore();

  const { campaign, mergeCampaign } = useCampaignStore();

  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      profile: campaign.profile ?? 'BASIC',
      configuration: {
        actions: [],
        colors: { primary: '#3f5efb', secondary: '#F59000' },
        disabled: campaign.configuration.disabled ?? true,
        game_type: campaign.configuration.game_type ?? 'WHEEL',
        gifts: campaign.configuration.gifts ?? [],
        retrievalConditions: [],
        logo_uri: campaign.configuration.logo_uri ?? '',
        conditionsType: 'NONE',
      },
      enabled: true,
      label: 'New Campaign',
      placeId: 'default-place-id',
    },
  });

  const { handleSubmit, getValues, setError, clearErrors } = methods;

  const onSubmit = (data: CampaignFormData) => {
    console.log('Campaign Data:', data);
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader onCampaignSave={() => methods.handleSubmit(onSubmit)()} />
        <PageContainer paddingY={8}>
          {!pinCode ? <PinCodeAlert sxProps={{ marginBottom: 8 }} /> : null}
          <ProfileSelector />
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
            <CampaignGains />
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
