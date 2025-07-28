import type { GameType, GiftType } from '../types';
import WheelImg from '../assets/wheel.jpg';
import MysteryImg from '../assets/mystery.png';
import SlotImg from '../assets/slot.png';
import CardImg from '../assets/card.png';

export const GAMES: { name: GameType; url: string }[] = [
  {
    name: 'WHEEL',
    url: WheelImg,
  },
  {
    name: 'MYSTERY',
    url: MysteryImg,
  },
  {
    name: 'SLOT_MACHINE',
    url: SlotImg,
  },
  {
    name: 'CARD',
    url: CardImg,
  },
];

export const GIFT_TYPE: GiftType[] = ['EAT', 'DRINK', 'DISCOUNT', 'LOSS'];
