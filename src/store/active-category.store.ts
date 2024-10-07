import { create } from 'zustand';

interface ActiveCategory {
  activeCategory: {
    id: number;
    name: string;
  };
  setActiveCategory: (category: { id: number; name: string }) => void;
}

export const useActiveCategory = create<ActiveCategory>(set => ({
  activeCategory: { id: 0, name: 'All' },
  setActiveCategory: newCategory =>
    set(() => ({ activeCategory: newCategory })),
}));
