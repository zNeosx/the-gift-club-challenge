export type ActionType = 'INSTAGRAM' | 'GOOGLE_REVIEW' | 'TIKTOK' | 'FACEBOOK';
export type GiftType = 'EAT' | 'DRINK' | 'DISCOUNT' | 'LOSS' | 'DRAW';
export type GameType = 'WHEEL' | 'SLOT_MACHINE' | 'MYSTERY' | 'CARD';
export type Profile = 'PREMIUM' | 'BASIC';
export type ConditionsType = 'NONE' | 'CUSTOM';

export interface Action {
  id: string;
  priority: number;
  target: string; //Account name or url
  type: ActionType;
}

export interface Colors {
  primary: string; //Hex
  secondary: string; //Hex
}

export interface Gift {
  id: string;
  icon: string;
  initial_limit: number;
  limit: number;
  name: string;
  type: GiftType;
  drawDate?: string;
}

export interface Conditions {
  id: string;
  giftId: string;
  name: string;
  value: string;
}

export interface Configuration {
  actions: Action[];
  colors: Colors;
  disabled: boolean;
  game_type: GameType;
  gifts: Gift[];
  retrievalConditions: Conditions[];
  conditionsType: ConditionsType;
  logo_uri: string;
}

export interface Campaign {
  id: string;
  profile: Profile;
  configuration: Configuration;
  created_at: string;
  created_by: string;
  enabled: boolean;
  label: string;
  placeId: string;
  updated_at: string;
  updated_by: string;
}
