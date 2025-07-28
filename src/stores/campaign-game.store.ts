import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameType } from '../types';

interface GameState {
  currentGame: GameType;
  setGame: (game: GameType) => void;
}

export const useCampaignGameStore = create<GameState>()(
  persist(
    (set) => ({
      currentGame: 'WHEEL',
      setGame: (game) =>
        set(() => ({
          currentGame: game,
        })),
    }),
    { name: 'campaign-game' }
  )
);
