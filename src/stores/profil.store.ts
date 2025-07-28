import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '../types';

interface ProfileState {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: 'BASIC',
      setProfile: (profile) =>
        set(() => ({
          profile,
        })),
    }),
    { name: 'profile' }
  )
);
