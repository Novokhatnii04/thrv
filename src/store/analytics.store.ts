import { create } from 'zustand';

interface AnalyticsStore {
  consent: boolean;
  setConsent: (consent: boolean) => void;
}

export const useAnalyticsStore = create<AnalyticsStore>(set => ({
  consent: false,
  setConsent: consent => set(() => ({ consent })),
}));
