import { create } from 'zustand';

export type UnitSystem = 'metric' | 'imperial';

type SettingsState = {
  language: string;
  unitSystem: UnitSystem;
  setLanguage: (language: string) => void;
  setUnitSystem: (unitSystem: UnitSystem) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'en',
  unitSystem: 'metric',
  setLanguage: (language) => set({ language }),
  setUnitSystem: (unitSystem) => set({ unitSystem }),
}));
