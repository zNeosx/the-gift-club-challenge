import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Action } from '../types';

interface ActionState {
  actions: Action[];
  addAction: (action: Action) => void;
  removeAction: (id: string) => void;
  updateAction: (id: string, updated: Partial<Action>) => void;
}

export const useCampaignActionStore = create<ActionState>()(
  persist(
    (set) => ({
      actions: [],
      addAction: (action) =>
        set((state) => ({
          actions: [...state.actions, action].sort(
            (a, b) => a.priority - b.priority
          ),
        })),
      removeAction: (id) =>
        set((state) => ({
          actions: state.actions.filter((a) => a.id !== id),
        })),
      updateAction: (id, updated) =>
        set((state) => ({
          actions: state.actions.map((a) =>
            a.id === id ? { ...a, ...updated } : a
          ),
        })),
    }),
    { name: 'campaign-actions' }
  )
);
