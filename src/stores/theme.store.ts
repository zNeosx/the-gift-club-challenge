import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Colors } from '../types';

interface ColorsState {
  primaryColor: Colors['primary'];
  secondaryColor: Colors['secondary'];
  setPrimaryColor: (primaryColor: Colors['primary']) => void;
  setSecondaryColor: (secondaryColor: Colors['secondary']) => void;
}

export const useThemeStore = create<ColorsState>()(
  persist(
    (set) => ({
      primaryColor: '#3f5efb',
      secondaryColor: '#F59000',
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
    }),
    { name: 'theme' }
  )
);
