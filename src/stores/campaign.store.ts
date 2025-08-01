import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CampaignFormData } from '../lib/validations/campaign.schema';
import type { Action, Colors, GameType, Profile } from '../types';

const DEFAULT_COLORS: Colors = {
  primary: '#3f5efb',
  secondary: '#F59000',
};

const createDefaultCampaign = (): CampaignFormData => ({
  id: crypto.randomUUID(),
  profile: 'BASIC' as Profile,
  configuration: {
    actions: [],
    colors: DEFAULT_COLORS,
    disabled: false,
    game_type: 'WHEEL' as GameType,
    gifts: [],
    retrievalConditions: [],
    logo_uri: '',
    conditionsType: 'NONE',
  },
  created_at: new Date().toISOString(),
  created_by: 'system',
  enabled: true,
  label: '',
  placeId: '',
  updated_at: new Date().toISOString(),
  updated_by: 'system',
});

interface CampaignState {
  campaign: CampaignFormData;
  setCampaign: (campaign: CampaignFormData) => void;
  mergeCampaign: (partial: Partial<CampaignFormData>) => void;
  updateProfile: (profile: Profile) => void;
  updateColors: (colors: Colors) => void;
  updateLogo: (logoUri: string) => void;
  updateGameType: (gameType: GameType) => void;
  addAction: (action: Action) => void;
  removeAction: (actionId: string) => void;
  updateAction: (actionId: string, updated: Partial<Action>) => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      campaign: createDefaultCampaign(),

      setCampaign: (campaign) => set({ campaign }),
      mergeCampaign: (partial) =>
        set((state) => ({
          campaign: {
            ...state.campaign,
            ...partial,
            configuration: {
              ...state.campaign.configuration,
              ...(partial.configuration || {}),
            },
            updated_at: new Date().toISOString(),
          },
        })),
      updateProfile: (profile) =>
        set((state) => ({
          campaign: {
            ...state.campaign,
            profile,
            updated_at: new Date().toISOString(),
          },
        })),
      updateColors: (colors) =>
        set((state) =>
          state.campaign
            ? {
                campaign: {
                  ...state.campaign,
                  configuration: {
                    ...state.campaign.configuration,
                    colors,
                  },
                },
              }
            : state
        ),

      updateLogo: (logoUri) =>
        set((state) =>
          state.campaign
            ? {
                campaign: {
                  ...state.campaign,
                  configuration: {
                    ...state.campaign.configuration,
                    logo_uri: logoUri,
                  },
                },
              }
            : state
        ),

      updateGameType: (gameType) =>
        set((state) =>
          state.campaign
            ? {
                campaign: {
                  ...state.campaign,
                  configuration: {
                    ...state.campaign.configuration,
                    game_type: gameType,
                  },
                },
              }
            : state
        ),

      addAction: (action) =>
        set((state) =>
          state.campaign
            ? {
                campaign: {
                  ...state.campaign,
                  configuration: {
                    ...state.campaign.configuration,
                    actions: [...state.campaign.configuration.actions, action],
                  },
                },
              }
            : state
        ),

      removeAction: (actionId) =>
        set((state) =>
          state.campaign
            ? {
                campaign: {
                  ...state.campaign,
                  configuration: {
                    ...state.campaign.configuration,
                    actions: state.campaign.configuration.actions.filter(
                      (a) => a.id !== actionId
                    ),
                  },
                },
              }
            : state
        ),

      updateAction: (actionId, updated) =>
        set((state) =>
          state.campaign
            ? {
                campaign: {
                  ...state.campaign,
                  configuration: {
                    ...state.campaign.configuration,
                    actions: state.campaign.configuration.actions.map((a) =>
                      a.id === actionId ? { ...a, ...updated } : a
                    ),
                  },
                },
              }
            : state
        ),
    }),
    {
      name: 'campaign-store',
    }
  )
);
