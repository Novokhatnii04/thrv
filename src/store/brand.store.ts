import { create } from 'zustand';
import { IBrandResponse } from '@/api/brand/brand.type';

interface IBrandStore {
  brand?: IBrandResponse;
  setBrand: (newBrand: IBrandResponse) => void;
}

export const useBrandStore = create<IBrandStore>(set => ({
  setBrand: newBrand => set(() => ({ brand: newBrand })),
}));
