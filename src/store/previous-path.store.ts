import { create } from 'zustand';

interface IBrandStore {
  previousPath: string;
  setPreviousPath: (currentPath: string) => void;
}

export const usePreviousPath = create<IBrandStore>(set => ({
  previousPath: '',
  setPreviousPath: currentPath => set(() => ({ previousPath: currentPath })),
}));
