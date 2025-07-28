import { Facebook, Google, Instagram } from '@mui/icons-material';
import type { ActionType, GiftType } from '../types';

export function formatActionType(type: ActionType | undefined) {
  switch (type) {
    case 'GOOGLE_REVIEW':
      return 'Avis Google';
    case 'INSTAGRAM':
      return 'Instagram';
    case 'TIKTOK':
      return 'TikTok';
    case 'FACEBOOK':
      return 'Facebook';
    default:
      return type;
  }
}

export function getActionIcon(type: ActionType | undefined) {
  switch (type) {
    case 'GOOGLE_REVIEW':
      return Google;
    case 'INSTAGRAM':
      return Instagram;
    case 'TIKTOK':
      return null;
    case 'FACEBOOK':
      return Facebook;
    default:
      return null;
  }
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

const giftTypeTranslations: Record<GiftType, string> = {
  EAT: 'Nourriture',
  DRINK: 'Boisson',
  DISCOUNT: 'Réduction',
  LOSS: 'Perte',
  DRAW: 'Tirage au sort',
};

export function translateGiftType(type: GiftType): string {
  return giftTypeTranslations[type];
}

export function getFrenchOrdinal(n: number): string {
  switch (n) {
    case 1:
      return 'premier';
    case 2:
      return 'deuxième';
    case 3:
      return 'troisième';
    case 4:
      return 'quatrième';
    case 5:
      return 'cinquième';
    case 6:
      return 'sixième';
    case 7:
      return 'septième';
    case 8:
      return 'huitième';
    case 9:
      return 'neuvième';
    case 10:
      return 'dixième';
    default:
      return `${n}ème`;
  }
}
