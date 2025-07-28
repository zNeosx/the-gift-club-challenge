import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PinCodeStore {
  pinCode: string | null;
  setPinCode: (code: string) => void;
  clearPin: () => void;
}

export const usePinCodeStore = create<PinCodeStore>()(
  persist(
    (set) => ({
      pinCode: null,
      setPinCode: (code) => {
        set({ pinCode: code });
      },
      clearPin: () => {
        set({ pinCode: null });
      },
    }),
    {
      name: 'pin-code',
    }
  )
);
